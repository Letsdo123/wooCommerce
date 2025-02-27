import { DataTypes } from "sequelize";
import sequelize from "../config/sqlClient.js";
import User from "./user.model.js";

const Bank = sequelize.define('Bank',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    entity_type: {
        type: DataTypes.ENUM("CUSTOMER", "SELLER", "LOGISTICS"), // Add more entity types if needed
        allowNull: false,
    },
    entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "ID of the user, seller, or logistic entity",
    },
    account_holder_name :{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    bank_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    account_number: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },
    ifsc_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    account_type: {
        type: DataTypes.ENUM('savings', 'current', 'business'),
        allowNull: false,
        defaultValue: 'savings',
    },
    upi_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true
    },
    is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{tableName:'banks',timestamps:false})

export default Bank