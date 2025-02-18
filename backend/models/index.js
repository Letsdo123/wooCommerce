import sequelize from "../config/sqlClient.js";
import User from "./user.model.js";
import Address from "./user.address.model.js";
import { Sequelize } from "sequelize";
import UserRole from "./user.role.model.js";
import Role from "./role.model.js";
import Bank from "./bank.model.js";
import Seller from "./user.seller.model.js";
import Document from "./document.model.js";

// Function to set up associations (called after models are defined)
const setupAssociations = () => {

    User.hasOne(Seller, { foreignKey: 'user_id', as: 'seller' }); // A User has one seller
    Seller.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

    // One to many (User has many Addresses)
    User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' });
    Address.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

    // user has many bank accounts
    User.hasMany(Bank, { foreignKey: 'user_id', as: 'bank' })
    Bank.belongsTo(User, { foreignKey: 'user_id', as: 'users' })

    // User has many documents (who uploaded them)
    User.hasMany(Document,{foreignKey:'user_id',as:'documents'})
    Document.belongsTo(User,{foreignKey:'user_id',as:'users'})

    Seller.hasMany(Document,{
        foreignKey:'entity_id',
        constraints:false,
        scope:{entity_type:"SELLER"},
        as:"documents"
    })

    Document.belongsTo(Seller, { 
        foreignKey: "entity_id", 
        constraints: false, 
        as: "seller"
    });
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
    UserRole,
    Bank,
    Document,
    Seller
}

export default db