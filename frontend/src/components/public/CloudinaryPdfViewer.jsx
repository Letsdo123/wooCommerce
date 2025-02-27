import { useState, useEffect } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useRetriveUploadUrlMutation } from "../../features/auth/authApi";

// ✅ Manually set the correct PDF worker
const PDF_WORKER_VERSION = "3.11.174"; // Match your installed version
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_WORKER_VERSION}/pdf.worker.min.js`;

const CloudinaryPdfViewer = ({ publicId }) => {
    const [retriveUploadUrl] = useRetriveUploadUrlMutation();
    const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
    const [error, setError] = useState(null);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        const fetchUploadUrl = async () => {
            try {
                const response = await retriveUploadUrl({ publicId });
                if (response?.data) {
                    setCloudinaryUrl(response.data?.data);
                    console.log("Cloudinary Url",response.data?.data);
                } else {
                    throw new Error("Invalid URL response");
                }
            } catch (err) {
                console.error("Error retrieving the upload URL", err);
                setError(err);
            }
        };

        if (publicId) {
            fetchUploadUrl();
        }
    }, [publicId]);

    if (error) {
        return <p>Error loading PDF: {error.message}</p>;
    }

    if (!cloudinaryUrl || typeof cloudinaryUrl !== "string" || cloudinaryUrl.trim() === "") {
        return <p>Loading PDF...</p>;
    }
    console.log("Cloudinary Url",cloudinaryUrl);
    return (
        <div style={{ height: "100vh", border: "1px solid #ccc" }}>
            <Worker workerUrl={GlobalWorkerOptions.workerSrc}>
                <Viewer fileUrl={cloudinaryUrl} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
        </div>
    );
};

export default CloudinaryPdfViewer;
