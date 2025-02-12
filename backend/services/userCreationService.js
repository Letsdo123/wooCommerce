import asyncHandler from "../../frontend/src/utils/asyncHandler.js";
import sequelize from "../config/sqlClient.js";

export const createUser = asyncHandler(async({name, email, mobile, gender, role, password, address, city, state, country, postal_code})=>{
    const [newUserId] = await sequelize.query(
        `
    INSERT INTO users 
    (name, email, mobile, gender, role, password, createdAt, updatedAt) 
    VALUES (:name, :email, :mobile, :gender, :role, :password, NOW(), NOW());
    `,
        {
            replacements: { name, email, mobile, gender, role, password },
            type: sequelize.QueryTypes.INSERT,
        }
    );
    const [newAddress] = await sequelize.query(
        'INSERT into addresses (user_id,address_type,address, city, state, country, postal_code) VALUES (:user_id,:address_type,:address, :city, :state , :country , :postal_code )',
        {
            replacements: { user_id: newUserId, address_type: 'shipping', address, city, state, country, postal_code },
            type: sequelize.QueryTypes.INSERT
        }
    )

    // This is for debugging purpose
    console.log("User details:",newUserId);
    console.log("Address details:", address);

    // finally returning the details
    return newUserId;
})