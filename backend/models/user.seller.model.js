import { DataTypes } from "sequelize";
import sequelize from "../config/sqlClient";
import User from "./user.model";

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
    gstin:{
        type:DataTypes.STRING(50),
        allowNull:false,
        defaultValue:null
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
    business_address:{
        type:DataTypes.JSON,
        allowNull:false
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

// Establishing the relationship between the customer and user
User.hasOne(Seller,{foreignKey:'user_id',as: 'seller'}); // A User has one seller
Seller.belongsTo(User,{foreignKey:'user_id',as:'User'}); // A seller belons to a user

export default Seller;