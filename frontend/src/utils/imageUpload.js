import asyncHandler from "./asyncHandler";
import axios from "axios";

// handling the uploading image from the backend and upload it to the frontend
const uploadImageUrl = asyncHandler(async (file,signedUrlData) => {
    if (!signedUrlData) {
        await refetch();
    }
    const { signature,folder, timestamp, cloudName, apiKey } = signedUrlData.data;

    // Prepare the form data
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append('folder', folder);
    //formData.append("folder","woocommerce");

    // Upload to Cloudinary
    const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
    );
    console.log("Uploaded response:",uploadResponse);
    return uploadResponse.data;
}
)

export default uploadImageUrl;