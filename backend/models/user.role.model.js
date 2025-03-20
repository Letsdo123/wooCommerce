import { DataTypes, INTEGER } from "sequelize";
import sequelize from "../config/sqlClient.js";

const UserRole = sequelize.define('UserRole',{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    userId:{type:DataTypes.INTEGER,references:{model:'User',key:'id'},onDelete:'CASCADE'},
    roleId:{type:DataTypes.INTEGER,references:{model:'Role',key:'id'},onDelete:'CASCADE'},
    entityId:{type:DataTypes.INTEGER,required:true},
    entityType:{type:DataTypes.ENUM('SUPER ADMIN','CUSTOMER','SELLER','LOGISTICS'),required:true},
    status:{type:DataTypes.ENUM('pending','approved','rejected'),defaultValue:'pending'}
},{tableName:'user_roles',timestamps:true})

export default UserRole