import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose'
import User from '../models/user.model.js';

// creating the first admin user
const createFirstAdminUser = asyncHandler(async () => {
    // check the admin exists or not
    // User.collection.dropIndex('phone_1');
    console.log("It is coming under createFirst User");
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (!existingAdmin) {
        const firstAdmin = {
            name: 'adminUser',
            email: 'admin@gmail.com',
            mobile: "9003004565",
            isVerified: true,
            password: '852963', // Hashing the password
            role: 'admin',
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