import sequelize from "../config/sqlClient.js";
import { DataTypes } from "sequelize";

// creating the user model using nodejs orm tool
// that uses mysql db
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    mobile: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('customer', 'seller', 'vendor', 'admin'),
        defaultValue: 'customer',
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        defaultValue: null
    },
    profile_picture: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other'),
        defaultValue: 'male',
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'banned'),
        defaultValue: "inactive",
        allowNull: false
    }
}, { timestamps: true })

export default User