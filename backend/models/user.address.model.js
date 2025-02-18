import sequelize from "../config/sqlClient.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";

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
        type:DataTypes.ENUM('billing','shipping','business'),
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
},{modelName:'address',timestamps:false})

export default Address