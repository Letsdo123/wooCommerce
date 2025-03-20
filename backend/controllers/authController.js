import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { v4 as uuidv4 } from 'uuid'
import { ResponseHandler } from '../services/responseHandler.js'
import User from '../models/user.model.js'
import { generateAccessToken, generateRefreshToken } from '../services/tokenServices.js'
import { deleteSession, saveSession } from '../utils/session.js'
import redisClient from '../config/redisClient.js'
import { resetPasswordEmail, sendOtpEmail } from '../services/emailService.js'
import mongoose from 'mongoose'
import sequelize from '../config/sqlClient.js'
import Approval from '../models/approval.model.js'
import { createUser } from '../services/userCreationService.js'
import EntityRelation from '../models/entity_relation.model.js'
import Document from '../models/document.model.js'
import Bank from '../models/bank.model.js'
import Address from '../models/user.address.model.js'
import { Op } from 'sequelize'
import Seller from '../models/user.seller.model.js'

// register a new user
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, mobile, gender, password, address, city, state, country, postal_code } = req.body.userData
    console.log("Registration request has come to the controller", req.body);

    // debugging
    console.log("Email:", email, "Mobile:", mobile);


    // This to option is temporarily closed
    // Because currently we are only authenticating based on the email
    // const to = preferredOtpMethod === 'email' ? email : mobile
    // check if the user is exists or not
    const [existingUser] = await sequelize.query(
        'SELECT * FROM users WHERE email = :email OR  mobile = :mobile',
        {
            replacements: { email: email, mobile: mobile },
            type: sequelize.QueryTypes.SELECT
        }
    )
    console.log("User existings status", existingUser);

    // if exists
    if (existingUser) return ResponseHandler.error(res, null, 'User already exists', 401)

    // generate the otp
    // creating a random otp
    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
    const otp = generateOtp()

    // before verifying we will store the user details temporarily
    const temoparyUserDetails = { name, email, mobile, gender, password, address, city, state, country, postal_code, otp }
    const reddisResponse = await redisClient.setEx(`temp_user:${email}`, 300, JSON.stringify(temoparyUserDetails))

    console.log("It is stored inside the reddis temporary user data", reddisResponse);
    // storing done now it's the time to verify the user
    await sendOtpEmail(email, { otp })

    console.log("Otp send successfully send from the backend");
    return ResponseHandler.success(res, { temoparyUserDetails }, 'Otp has been sent sucessfully', 201)
})

// This is the function to verify a user
export const verifyUser = asyncHandler(async (req, res) => {
    // const { identifier, code } = req.body
    // console.log("Data has come from the frontend to backend", identifier, code)
    console.log("It is coming under verify user");
    // checking without frontend
    const identifier = 'ariyan.mk@gmail.com'
    const code = '126777'

    // getting the temporary user from the reddis db
    const tempUser = await redisClient.get(`temp_user:${identifier}`)
    console.log("Temporary user details:", tempUser)
    if (!tempUser) return ResponseHandler.error(res, null, 'experied otp', 400)

    // Parsing the data from reddis db
    const { name, email, mobile, gender, password, address, city, state, country, postal_code, otp } = JSON.parse(tempUser)

    // Verify OTP with Twilio
    // const verificationStatus = await verifyOtp(identifier, code)
    // console.log("verification status:", verificationStatus);
    if (code == otp) {

        // if OTP is correct then we will create a new user
        const newUserId = await createUser({ name, email, mobile, gender, password, address, city, state, country, postal_code })
        console.log("New user id", newUserId);

        if (newUserId == undefined) ResponseHandler.error(res, null, "Internal server error", 500)
        // creating both token access token & refresh token
        const accessToken = generateAccessToken(newUserId)
        const refreshToken = generateRefreshToken(newUserId)

        // store inside the reddis
        await saveSession(newUserId, refreshToken)

        // deliting the temporary user details from the reddis
        // bcz the user is verified now no need to store it temporary
        // we will store it to the mongodb now
        await redisClient.del(`temp_user:${identifier}`)


        // send the token to the client through cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        // sending the final response throught the response handler class 'ResponseHandler'
        // with res,data,message,statusCode
        return ResponseHandler.success(res, { newUserId, accessToken }, 'User registred successfully!', 201)
    }
    else
        return ResponseHandler.error(res, null, "Wrong otp", 400)
})

// This is the function to login a user
export const loginUser = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;
    console.log("User came for login data", identifier, password);
    // Checking if user exists
    const [existingUser] = await sequelize.query(
        'SELECT * from users WHERE email = :identifier OR mobile = :identifier',
        {
            replacements: { identifier },
            type: sequelize.QueryTypes.SELECT
        }
    );

    // If existingUser is undefined
    // Then no user has found
    if (!existingUser) return ResponseHandler.error(res, null, "Wrong Email or Mobile number", 401);

    // else user founded
    console.log("User found");
    console.log("Founded user details:", existingUser);

    // Check if the password is correct
    // console.log("both password details:", password, user[0].password);
    // const isPasswordCorrect = await bcrypt.compare(password.trim(), user[0].password);
    const isPasswordCorrect = existingUser.password === password
    console.log("Password is correct", isPasswordCorrect);
    if (!isPasswordCorrect) return ResponseHandler.error(res, null, "Wrong Password", 401);  // Note the return here

    console.log("Password is correct");

    const userId = existingUser.id
    // now this is confirm that the user is valid
    // so we need to get the details of the role of the user
    const userRoles = await sequelize.query(
        `SELECT ur.roleId,r.name,ur.entityType,ur.entityId FROM user_roles ur JOIN roles r ON ur.roleId = r.id WHERE ur.userId = :userId`,
        {
            replacements: { userId },
            type: sequelize.QueryTypes.SELECT
        }
    )
    console.log("UserRole details:", userRoles);
    // Create access and refresh tokens
    const accessToken = generateAccessToken(existingUser.id);  // Use user[0]._id
    const refreshToken = generateRefreshToken(existingUser.id); // Use user[0]._id

    // Store refresh token in Redis
    await saveSession(existingUser.id, refreshToken); // Use user[0]._id

    // Set refresh token in a cookie
    console.log("Access token refresh token generated");
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send success response
    return ResponseHandler.success(res, { profile: existingUser, roles: userRoles, accessToken }, 'User Logged in successfully!', 201);
});


// This is the function to logout a user
export const logoutUser = asyncHandler(async (req, res) => {
    // extracting the userId from the request
    console.log("Request has come to logout controller");
    console.log("Extracted data from the middleware:", req.user);
    const userId = req.user.userId

    // delete the saved session from the reddis db
    await deleteSession(userId.toString())

    // delete refershToken from the cookies
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })

    // return the final response
    return ResponseHandler.success(res, null, "User loggedout successfully", 201)
})

// This is the function to handle the password reset and the initial state
export const requestPasswordReset = asyncHandler(async (req, res) => {

    // Here I will get the registered email/mobile of the user
    const { email } = req.body
    console.log("Identifier value : ", email);
    // const userFindObj = identifier.includes('@') ? { email: identifier } : { mobile: identifier }
    // Here I will check that the email/mobile basically the identifeir is exists or not
    // Basically find the user is present or not
    const user = await User.findOne({ email })

    if (!user || user.length === 0) return ResponseHandler.error(res, null, "Wrong Email or Mobile number", 401);

    // If user found then generate the token
    const token = uuidv4()
    console.log("User found", user);
    console.log("Token has been generated", token);

    // temporary setting the 
    await redisClient.setEx(`temp_token:${token}`, 600, JSON.stringify(user._id.toString()));

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    // if all set then we can send the link throught the email
    // await sendPasswordResetEmail(user[0].email, user[0].name, resetLink)
    await resetPasswordEmail(email, { username: user.name, reset_url: resetLink })

    return ResponseHandler.success(res, null, 'Reset password link successfully sent!', 201)
})

// This is the function to verify and reset the password
export const resetPassword = asyncHandler(async (req, res) => {

    // extracting the token and the newPassword
    const { token, newPassword } = req.body


    // checking the token is valid or experied
    let userId = await redisClient.get(`temp_token:${token}`)

    if (!userId) return ResponseHandler.error(res, null, "Your session has been experied", 400)

    console.log("UserId :", userId);
    // Remove any extra quotes and convert to ObjectId
    userId = new mongoose.Types.ObjectId(userId.replace(/"/g, ""));

    // now the time is to find the user
    const user = await User.findById(userId)
    if (!user) return ResponseHandler.error(res, null, "User doesn't exist", 400)

    // if user exists then simply update the password
    user.password = newPassword
    await user.save()

    // deleting the token after successfully reset the password
    await redisClient.del(token)

    return ResponseHandler.success(res, null, "Password reset successfylly.", 200)
})

// Get all user approval details
export const getUserApprovalDetails = asyncHandler(async (req, res) => {
    const approvalDetails = await Approval.find({
        entityType: "User"
    })
    if (!approvalDetails) return ResponseHandler.error(res, null, "Something went wrong while fetching the user approval details", 404);

    else return ResponseHandler.success(res, approvalDetails, "Approval details fetched successfully", 201);
})

// This is the controllers that handles the role management
export const createRole = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    console.log("Name and description of the roles:", name, description);
    console.log("Request has come to the create Role controller");
    console.log("User details fetched from the middleware", req.user);
    const createdBy = req.user.name
    console.log("Created by", createdBy, name, description);
    const [newRole] = await sequelize.query(
        `INSERT INTO roles (name,description,createdBy,createdAt,updatedAt) values(:name,:description,:createdBy,now(),now())`,
        {
            replacements: { name, description, createdBy },
            type: sequelize.QueryTypes.INSERT
        }
    )
    return ResponseHandler.success(res, { newRole }, "Role has been created successfully", 201)
})

// get all roles
export const getAllRoles = asyncHandler(async (req, res) => {
    const roles = await sequelize.query(
        `SELECT id, name FROM roles where id!=1 and id!=3`,
        {
            type: sequelize.QueryTypes.SELECT
        }
    );
    console.log(roles);
    if (!roles) return ResponseHandler.error(res, null, "No roles found", 404)
    else return ResponseHandler.success(res, roles, "Roles fetched successfully", 200)
})

// Here we will get the user details
export const getUserDetails = asyncHandler(async (req, res) => {
    async function cleanData(rawData) {
        const result = {};
    
        for (const item of rawData) {
            const { entity_type, entity_id, related_type } = item;
    
            // Fetch basic user details asynchronously
            const basicUserDetails = await Seller.findOne({
                where: { id: entity_id }, // Assuming entity_id corresponds to user_id
            });
    
            // Initialize the entity type and ID if not already present
            if (!result[entity_type]) {
                result[entity_type] = {
                    entity_type,
                    entity_id,
                    basicDetails: basicUserDetails ? basicUserDetails.dataValues : null, // Add basicDetails
                    address: [],
                    documents: [],
                    bank_details: []
                };
            }
    
            // Add related data to the appropriate array
            if (related_type === "ADDRESS" && item.addresses) {
                result[entity_type].address.push(item.addresses.dataValues); // Extract dataValues
            } else if (related_type === "DOCUMENT" && item.documents) {
                result[entity_type].documents.push(item.documents.dataValues); // Extract dataValues
            } else if (related_type === "BANK" && item.banks) {
                result[entity_type].bank_details.push(item.banks.dataValues); // Extract dataValues
            }
        }
    
        return result;
    }
    try {
        const { entityIds, entityTypes } = req.body;
        const userId = req.user.id;
        console.log("User id:", userId);
        if (!userId) {
            return ResponseHandler.error(res, null, "User ID not found", 400);
        }

        let entityIdSet = new Set(entityIds || [userId]);
        let entityTypeSet = new Set(entityTypes || []);

        if (!entityIds || !entityTypes) {
            const userRoles = await EntityRelation.findAll({
                where: { entity_id: userId },
                attributes: ["entity_id", "entity_type"],
            });

            if (!userRoles.length) {
                return ResponseHandler.error(res, null, "User roles not found", 404);
            }

            userRoles.forEach((role) => {
                entityIdSet.add(role.entity_id);
                entityTypeSet.add(role.entity_type);
            });
        }
        console.log("Entity IDs:", [...entityIdSet]);
        console.log("Entity Types:", [...entityTypeSet]);
        // const basicUserDetails = await Seller.findOne({
        //     where: { user_id: userId },
        // })
        const userDetails = await EntityRelation.findAll({
            where: {
                entity_id: [...entityIdSet],
                entity_type: [...entityTypeSet],
            },
            include: [
                {
                    model: Document,
                    as: "documents",
                    required: false,
                    where: { entity_id: { [Op.in]: [...entityIdSet] } }, // Ensure matching entity_id
                },
                {
                    model: Bank,
                    as: "banks",
                    required: false,
                    where: { entity_id: { [Op.in]: [...entityIdSet] } },
                },
                {
                    model: Address,
                    as: "addresses",
                    required: false,
                    where: { entity_id: { [Op.in]: [...entityIdSet] } },
                },
            ],
        });
        // console.log('Basic User Details:', basicUserDetails);
        const modifiedData = await cleanData(userDetails);
        console.log("Modified Data:", modifiedData);
        // const updatedData = {
        //     basicDetails: basicUserDetails.dataValues,
        //     extraDetails: modifiedData
        // }
        return ResponseHandler.success(res, modifiedData, "User details fetched successfully", 200);
    } catch (error) {
        console.error("Error fetching user details:", error);
        return ResponseHandler.error(res, null, "Error fetching user details", 500);
    }
});  