import sequelize from "../config/sqlClient.js";
import User from "./user.model.js";
import Address from "./user.address.model.js";
import { Sequelize } from "sequelize";
import UserRole from "./user.role.model.js";
import Role from "./role.model.js";
import Bank from "./bank.model.js";
import Seller from "./user.seller.model.js";
import Document from "./document.model.js";
import Customer from "./user.customer.model.js";
import EntityRelation from "./entity_relation.model.js";

// Function to set up associations (called after models are defined)
const setupAssociations = () => {

    User.hasOne(Seller, { foreignKey: 'user_id', as: 'sellers' });
    Seller.belongsTo(User, { foreignKey: 'user_id', as: 'users' });

    User.hasOne(Customer,{foreignKey:'user_id',as:'userCustomer'});
    Customer.belongsTo(User,{foreignKey:'user_id',as:'customerUser'});

    // Now I am creating the relationship with entityRelationModel
    EntityRelation.belongsTo(Customer,{
        foreignKey: 'entity_id',
        constraints:false,
        as: 'customerRelations'
    })

    EntityRelation.belongsTo(Seller,{
        foreignKey: 'entity_id',
        constraints:false,
        as: 'sellerRelations'
    })

    EntityRelation.belongsTo(Address,{
        foreignKey: 'related_id',
        constraints:false,
        as: 'addresses'
    })

    Address.hasMany(EntityRelation,{
        foreignKey: 'related_id',
        constraints:false,
        scope: { related_type: "ADDRESS" },
        as: "addressRelations" 
    })

    EntityRelation.belongsTo(Document, { 
        foreignKey: "related_id", 
        constraints: false, 
        as: "documents" 
    });

    Document.hasMany(EntityRelation, { 
        foreignKey: "related_id", 
        constraints: false, 
        scope: { related_type: "DOCUMENT" },
        as: "documentRelations" 
    });

    EntityRelation.belongsTo(Bank,{
        foreignKey: 'related_id',
        constraints:false,
        as: 'banks'
    })

    Bank.hasMany(EntityRelation,{
        foreignKey: 'related_id',
        constraints:false,
        scope: { related_type: "BANK" },
        as: "bankRelations"
    })
    
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
    Seller,
    EntityRelation
}

export default db