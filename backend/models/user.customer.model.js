import {DataTypes} from "sequelize"
import User from "./user.model"
import sequelize from "../config/sqlClient"

// Here we are definging the model
// of the customer model
const Customer = sequelize.define('Customer',{
    user_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        },
        onDelete:'CASCADE'
    },
    loyality_points : {
        type: DataTypes.INTEGER,
        defaultValue : 0,
        allowNull :false
    },
    wishlist: {
        type: DataTypes.JSON,
        defaultValue: null,
        allowNull: true
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    },
    preferences: {
        type: DataTypes.JSON,
        defaultValue: null,
        allowNull: true
    }
},{tableName:'customer',timestamps:false})

// Establishing the relationship between the customer and user
User.hasOne(Customer,{foreignKey:'user_id',as: 'customer'}); // A User has one customer
Customer.belongsTo(User,{foreignKey:'user_id',as:'User'}); // A customer belons to a user

export default Customer