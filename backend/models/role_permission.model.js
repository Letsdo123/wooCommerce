import sequelize from "../config/sqlClient";
import { DataTypes } from "sequelize";

const RolePermission = sequelize.define('RolePermission',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleId :{
        type: DataTypes.INTEGER,
        references:{
            model:'roles',
            key:'id'
        },
        onDelete:'CASCADE'
    },
    permissionId:{
        type: DataTypes.INTEGER,
        references:{
            model:'permissions',
            key:'id'
        },
        onDelete:'CASCADE'
    }
},{tableName:'role_permissions',timestamps:true})

export default RolePermission;