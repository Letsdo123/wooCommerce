import asyncHandler from 'express-async-handler'
import cloudinary from '../config/clodinaryConfig.js';
import dotenv from 'dotenv';
import { ResponseHandler } from '../services/responseHandler.js';

dotenv.config()

export const generateImageUrl = asyncHandler(async (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp,
            folder: "woocommerce",
        },
        process.env.CLOUDINARY_API_SECRET
    )

    return ResponseHandler.success(res, {
        signature, timestamp, cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
    },"Successfully created the signed image url",201)

})

export const generateSignedUrl = (req, res) => {
    const { folder, timestamp } = req.body;
    console.log("Folder and timestamp:",folder,timestamp);
    // Set default folder path if not provided
    const folderPath = folder ? `woocommerce/${folder}` : "woocommerce";

    // Generate the signature using the provided timestamp
    const signature = cloudinary.utils.api_sign_request(
        {
            folder: folderPath,
            timestamp,
        },
        process.env.CLOUDINARY_API_SECRET
    );

    console.log("Signature:",signature);
    return ResponseHandler.success(res, {
        signature, timestamp,folder: folderPath, cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
    },"Successfully created the signed image url",201)

};