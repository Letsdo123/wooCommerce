import { DataTypes } from "sequelize";
import sequelize from "../config/sqlClient";
import User from "./user.model";

const Address = sequelize.define('Address',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        },
        onDelete:'CASCADE'
    },
    address_type:{
        type:DataTypes.ENUM('billing','shipping'),
        allowNull:false,

    },
    addressline:{
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
        defaultValue:""
    },
    city:{
        type:DataTypes.STRING(255),
        allowNull:false,
        defaultValue:""
    },
    postal_code:{
        type:DataTypes.STRING(20),
        allowNull:false,
        defaultValue:""
    }
},{modelName:'address',timestamps:false})

User.hasMany(Address,{foreignKey:"user_id",as:User}) // a user can has multiple address
Address.belongsTo(User,{foreignKey:"user_id",as:Address})