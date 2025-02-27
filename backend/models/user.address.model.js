import sequelize from "../config/sqlClient.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Address = sequelize.define('Address',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    address_type:{
        type:DataTypes.ENUM('billing','shipping','business','logistics'),
        allowNull:false,
        defaultValue:"shipping"
    },
    address:{
        type:DataTypes.STRING(255),
        allowNull:false,
        defaultValue:""
    },
    city:{
        type:DataTypes.STRING(100),
        allowNull:false,
        defaultValue:""
    },
    state:{
        type:DataTypes.STRING(100),
        allowNull:false,
        defaultValue:""
    },
    country:{
        type:DataTypes.STRING(100),
        allowNull:false,
        defaultValue:"India"
    },
    postal_code:{
        type:DataTypes.STRING(20),
        allowNull:false,
        defaultValue:""
    }
},{tableName:'addresses',timestamps:false})

export default Address