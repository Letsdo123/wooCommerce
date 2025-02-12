import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose'
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

// creating the first admin user
const createFirstAdminUser = asyncHandler(async () => {
    // check the admin exists or not
    // User.collection.dropIndex('phone_1');
    console.log("It is coming under createFirst User");
    const existingAdmin = await User.findOne({ role: 'admin' });
    const existingRole = await Role.findOne({ name: 'super_admin' });
    if (!existingRole) {
        // basic details of super admin
        const role = {
            name: 'super_admin',
            description: 'Super Admin Role',
            createdBy: 'super_admin'
        }
        await Role.create(role);
        console.log('Super admin created successfully!');
    }
    else{
        console.log("Super admin already exist.")
        console.log("Role details:",existingRole.id);
    };
    if (!existingAdmin) {
        const firstAdmin = {
            name: 'Super Admin',
            email: 'superadmin@woocommerce.com',
            mobile: "9003004565",
            isVerified: true,
            password: '852963', // Hashing the password
            role: existingRole.id,
        }
        await User.create(firstAdmin)
        console.log('First admin created successfully!');
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