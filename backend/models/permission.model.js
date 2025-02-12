import sequelize from "../config/sqlClient";
import { DataTypes } from "sequelize";


const Permission = sequelize.define('Permission',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{tableName:'permissions',timestamps:true})

export default Permission;