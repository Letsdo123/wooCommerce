import asyncHandler from "./asyncHandler";
import axios from "axios";

const getResourceType = (file) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "raw"; // Default for PDFs and other files
};


// handling the uploading image from the backend and upload it to the frontend
const uploadImageUrl = asyncHandler(async (file, context, signedUrlData) => {
    if (!signedUrlData) {
        await refetch();
    }

    const { signature, folder, timestamp, cloudName, apiKey } = signedUrlData.data;
    const resourceType = "image"; // Dynamically determine resource type

    // Prepare the form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append('folder', folder);
    formData.append("type", "upload");
    if (context) {
        formData.append("context", `document_type=${context}`);
    }
    try {
        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await uploadResponse.json();
        console.log("Uploaded file:", data);
        return data;
    } catch (error) {
        console.error("Upload failed:", error);
    }
}
)

export default uploadImageUrl;