import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose'
import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import UserRole from '../models/user.role.model.js';

// creating the first admin user
const createFirstAdminUser = asyncHandler(async () => {
    // check the admin exists or not
    // User.collection.dropIndex('phone_1');
    console.log("It is coming under createFirst User");
    let existingSuperAdmin = await User.findOne({ name: 'Super Admin' });
    let existingRole = await Role.findOne({ name: 'SUPER ADMIN' });
    // This creates the super admin role first
    // if doesn't exists
    if (!existingRole) {
        // basic details of super admin
        const role = {
            name: 'SUPER ADMIN',
            description: 'Super Admin Role has access to everythings.',
            createdBy: 'Woocommerce Super Admin'
        }
        existingRole = await Role.create(role);
        console.log('Super admin created successfully!');
    }
    else {
        console.log("Super admin Role already exist.")
        console.log("Role details:", existingRole.id);
    };
    if (!existingSuperAdmin) {
        const firstAdmin = {
            name: 'Woocommerce Super Admin',
            email: 'superadmin@woocommerce.com',
            mobile: "9003004565",
            isVerified: true,
            password: '852963', // Hashing the password
        }
        existingSuperAdmin = await User.create(firstAdmin)
        console.log('First super admin created successfully!');

        // inserting this details into userrole model
        const userRoleDetails = {
            userId: existingSuperAdmin.id,
            roleId: existingRole.id,
            entityId: existingSuperAdmin.id,
            entityType: 'SUPER ADMIN',
            status: "approved"
        }
        const firstUserRole = await UserRole.create(userRoleDetails)
        console.log("First user role created successfully", firstUserRole);
    }
    else console.log("Admin already exists");
})

// This is database connection
const connectDB = asyncHandler(async () => {
    console.log("Mongo URI", process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await createFirstAdminUser()
})

export default connectDB