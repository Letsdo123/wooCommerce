import sequelize from "../config/sqlClient.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define("Role",{
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:true
    },
    createdBy :{
        type : DataTypes.STRING,
        allowNull:false
    }
},{tableName:'roles',timestamps:true})

export default Role