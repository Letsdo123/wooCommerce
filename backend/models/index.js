import sequelize from "../config/sqlClient.js";
import User from "./user.model.js";
import Address from "./user.address.model.js";
import { Sequelize } from "sequelize";
import UserRole from "./user.role.model.js";
import Role from "./role.model.js";

// Function to set up associations (called after models are defined)
const setupAssociations = () => {
    User.hasMany(Address, { foreignKey: 'user_id', as: 'address' });
    Address.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    // Many-to-Many: User <-> Role
    User.belongsToMany(Role, { through: UserRole, foreignKey: "userId", as: "roles" });
    Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId", as: "users" });
};

setupAssociations()
// export { sequelize, User, Address, setupAssociations }

const db = {
    sequelize,
    Sequelize,
    Address,
    User,
    Role,
    UserRole
}

export default db