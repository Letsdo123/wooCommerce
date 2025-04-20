import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ["PRODUCT", "CATEGORY", "USER", "BANNER", "OTHER"], // Extendable for future use
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "entityType", // Dynamically references the related collection
    },
    imageType: {
      type: String,
      enum: ["THUMBNAIL", "GALLERY", "BANNER", "ICON"], // Define the purpose of the image
      required: true,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
      comment: "Cloudinary public ID for managing the image",
    },
    fileType: {
      type: String,
      // enum: ["image/jpeg", "image/png", "image/webp", "image/gif"], // Supported file types
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      type: Object,
      default: {},
      comment: "Additional metadata like dimensions, size, etc.",
    },
  },
  {
    collection: "images",
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;