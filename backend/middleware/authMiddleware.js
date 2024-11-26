import jwt from 'jsonwebtoken'
import { getSession } from '../utils/session.js'
import { generateAccessToken } from '../services/tokenServices.js';
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'
import { ResponseHandler } from '../services/responseHandler.js';

// iniatializing the dotenv
// without this we can't use dotenv file variables
dotenv.config()

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;

// Middleware to validate access token
export const authenticateToken = (req, res, next) => {
    // The access token will come the autorization header
    // because the access token will store in the locallly in the client machine
    // because it is recommended to store access token locally as a variable
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token value:", token);
    if (!token) return ResponseHandler.error(res, null, "Token doesn't found", 400)
    console.log("Accesstoken secret is :", ACCESS_TOKEN_SECRET);
    // if token is avaiable
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        console.log("Error during authenticate:", err);
        if (err) return ResponseHandler.error(res, null, "Invalid token", 400) // Invalid token

        req.user = user; // Attach user info to the request
        next(); // pass to next middleware
    })
}

// This is the middleware that checks the access controller
export const restrictTo = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return ResponseHandler.error(res, null, "Access denied", 400)
    }
    next(); // Continue to the next middleware or route handler
};


//  Middleware to handle refresh tokens if the access token experies
// Then it creates a new accesstoken
export const refreshToken = asyncHandler(async (req, res) => {
    // const { userId, refreshToken } = req.body;

    const refreshToken = req.cookies?.refreshToken
    const userId = jwt.decode(refreshToken)?.id

    if (!refreshToken) return ResponseHandler.error(res, null, "Refresh token not found", 401);

    // Get refresh token from Redis
    // The refresh token is saved into redis through the save session function
    // This is inside the session.js were we save,get and delete a session
    const storedRefreshedToken = await getSession(userId)

    if (!storedRefreshedToken || storedRefreshedToken !== refreshToken) return ResponseHandler.error(res, null, "Invalid refresh token", 403);

    // Verify the refresh token
    jwt.verify(storedRefreshedToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return ResponseHandler.error(res, null, "Expired refresh token", 403);
        // generate the new Access token bcz the refreshToken is valid
        const accessToken = generateAccessToken(userId)

        res.json({ accessToken })
    })
}
)