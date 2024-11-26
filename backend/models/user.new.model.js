import sequelize from "../config/sqlClient";
import { DataTypes } from "sequelize";

// creating the user model using nodejs orm tool
// that uses mysql db
const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    mobile:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    }
})