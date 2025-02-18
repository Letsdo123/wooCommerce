import { DataTypes } from "sequelize";
import sequelize from "../config/sqlClient.js";
import User from "./user.model.js";

// Here we are defining the model of the seller
// using sequilizing
const Seller = sequelize.define('Seller',{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        references:{
            user:User,
            key:'id'
        },
        onDelete:'CASCADE',
    },
    business_name:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    owner_name :{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    business_email :{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    business_mobile :{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    gstin:{
        type:DataTypes.STRING(50),
        allowNull:false,
        defaultValue:""
    },
    ratings_avg:{
        type:DataTypes.DECIMAL(3,2),
        defaultValue:0.00
    },
    total_sales:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    total_orders:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    delivery_capacity:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    is_live:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    total_reviews:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
},{tableName:"seller",timestamps:false})

export default Seller;