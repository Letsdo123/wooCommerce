import asyncHandler from "../../frontend/src/utils/asyncHandler.js";
import sequelize from "../config/sqlClient.js";
import { ResponseHandler } from "./responseHandler.js";

export const createUser = asyncHandler(async ({ name, email, mobile, gender, password, address, city, state, country, postal_code }) => {
    const transaction = await sequelize.transaction();
    try {
        // here we are inserting the user
        const [newUserId] = await sequelize.query(
            `
    INSERT INTO users 
    (name, email, mobile, gender, password, createdAt, updatedAt) 
    VALUES (:name, :email, :mobile, :gender, :password, NOW(), NOW());
    `,
            {
                replacements: { name, email, mobile, gender, password },
                type: sequelize.QueryTypes.INSERT,
                transaction
            }
        );

        // Here we are inserting the address
        const [userAddress] = await sequelize.query(
            `INSERT INTO addresses (entity_type,entity_id,address_type,address,city,state,country,postal_code) values ('CUSTOMER',:newUserId,'shipping',:address,:city,:state,:country,:postal_code)`,
            {
                replacements: { newUserId, address, city, state, country, postal_code },
                type: sequelize.QueryTypes.INSERT,
                transaction
            }
        )

        // finding the role id of CUSTOMER
        const [customerRole] = await sequelize.query(
            `SELECT id FROM roles WHERE name = 'CUSTOMER'`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction
            }
        )
        if(!customerRole){
            console.error("Customer role not found");
        }
        const customerRoleId = customerRole.id; // This is customer role id
        console.log("New userId:", newUserId); // This is new userId

        // insert into user role by default as CUSTOMER
        const userRole = await sequelize.query(
            `INSERT INTO user_roles (userId,roleId,entityId,entityType,status,createdAt,updatedAt) values (:newUserId,:customerRoleId,:newUserId,"CUSTOMER","approved",now(),now())`,
            {
                replacements: { newUserId, customerRoleId },
                type: sequelize.QueryTypes.INSERT,
                transaction
            }
        )

        // logging the above inserted details
        console.log("User role creation status", userRole);
        console.log("User details:", newUserId);
        console.log("Address details:", userAddress);
        // here we are committing the transaction
        await transaction.commit();
        // finally returning the details
        return newUserId;
    } catch (error) {
        await transaction.rollback();
        console.error("Transaction failed:", error);
    }
})