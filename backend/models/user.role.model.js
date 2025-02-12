import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/sqlClient.js";

const UserRole = sequelize.define('UserRole',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    userId:{type:DataTypes.INTEGER,references:{model:'Users',key:'id'},onDelete:'CASCADE'},
    roleId:{type:DataTypes.INTEGER,references:{model:'Roles',key:'id'},onDelete:'CASCADE'},
    status:{type:DataTypes.ENUM('pending','approved','rejected'),defaultValue:'pending'}
},{timestamps:true})

export default UserRole