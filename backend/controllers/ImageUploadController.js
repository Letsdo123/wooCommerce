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
    }, "Successfully created the signed image url", 201)

})

export const generateSignedUrl = (req, res) => {
    const { folder, timestamp, context } = req.body;
    console.log("Folder and timestamp:", folder, timestamp);
    // Set default folder path if not provided
    const folderPath = folder ? `woocommerce/${folder}` : "woocommerce";

    // Generate the signature using the provided timestamp
    const signature = cloudinary.utils.api_sign_request(
        {
            folder: folderPath,
            timestamp,
            context: `document_type=${context}`,
            type: "upload", 
        },
        process.env.CLOUDINARY_API_SECRET
    );

    console.log("Signature:", signature);
    return ResponseHandler.success(res, {
        signature, timestamp, folder: folderPath, cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
    }, "Successfully created the signed image url", 201)

};

export const getDocumentUrl = asyncHandler((req, res) => {
    const { publicId, format } = req.params;
    if (!publicId) return ResponseHandler.error(res, null, "Public Id is required!", 400)
    if (!format) return ResponseHandler.error(res, null, "Format is required!", 400)

    const documentUrl = cloudinary.url(publicId, {
        secure: true,
        format
    })
    return ResponseHandler.success(res, { url: documentUrl }, "Successfully generated the url", 200)
})

export const getSignedPdfUrl = async (req, res) => {
    try {
        const { publicId } = req.body; // Public ID of the uploaded file

        if (!publicId) {
            return ResponseHandler.error(res, null, "Missing publicId", 400)
        }
        // Generate a signed URL using Cloudinary's built-in method
        // const secureUrl = cloudinary.utils.private_download_url(
        //     publicId,
        //     "pdf",
        //     {
        //         type: "authenticated",
        //         resource_type: "raw",
        //         expires_at: Math.round(new Date().getTime() / 1000) + 3600,
        //     }
        // );

        // Fetch file details from Cloudinary
        const result = await cloudinary.api.resource(publicId, {
            resource_type: "raw",
        });

        console.log("Generated signed secure PDF URL:", result);
        return ResponseHandler.success(res, secureUrl, "Successfully generated the secure URL", 200);
    } catch (error) {
        console.error("Error generating signed URL:", error);
        return ResponseHandler.error(res, null, "Failed to generate signed URL", 500)
    }
};