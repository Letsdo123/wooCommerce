import { DataTypes } from "sequelize";
import sequelize from "../config/sqlClient.js";
import User from "./user.model.js";

const Document = sequelize.define("Document", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    entity_type: {
        type: DataTypes.ENUM("CUSTOMER", "SELLER", "LOGISTICS"), // Add more entity types if needed
        allowNull: false,
    },
    entity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "ID of the user, seller, or logistic entity",
    },
    document_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "e.g., GST, PAN, Aadhar, Trade License",
    },
    public_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Cloudinary public ID for deletions/updates",
    },
    file_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "This contains the file type like image,pdf,video etc."
    },
    uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "documents",
    timestamps: false,
});

export default Document;