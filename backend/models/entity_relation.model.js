import { DataTypes } from "sequelize";
import sequelize from "../config/sqlClient.js";

const EntityRelation = sequelize.define("EntityRelation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entity_type: {
        type: DataTypes.ENUM("CUSTOMER", "SELLER", "LOGISTICS"), 
        allowNull: false
    },
    entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "ID of the user, seller, or logistic entity"
    },
    related_type: {
        type: DataTypes.ENUM("ADDRESS", "DOCUMENT","BANK"),
        allowNull: false
    },
    related_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "ID of the related record (Address, Document,Bank details etc)"
    }
}, { tableName:'entity_relations',timestamps: false });

export default EntityRelation;
