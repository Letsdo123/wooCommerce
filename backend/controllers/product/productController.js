import Image from "../../models/image.model.js";
import Product from "../../models/product/product.model.js";
import ProductAttributes from "../../models/product/product_attributes.model.js";
import ProductInventory from "../../models/product/product_inventory.model.js";
import ProductPricing from "../../models/product/product_pricing.model.js";
import ProductSEO from "../../models/product/product_seo.model.js";
import asyncHandler from "express-async-handler";
import { ResponseHandler } from "../../services/responseHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
    const { name, description, image, price, quantity, isActive, category, subcategory } = req.body;
    const product = await Product.create({
        name,
        description,
        image,
        price,
        quantity,
        isActive,
        category,
        subcategory
    });
    if (!product) {
        return ResponseHandler.error(res, null, "Product Not Created", 400);
    }

    return ResponseHandler.success(res, product, "Product Created ", 200);
});

// controller to add all products
export const addProducts = asyncHandler(async (req, res) => {
    const { basic, pricing, attributes, seo, inventory, images, thumbnail } = req.body;
    // Check if all required fields are present
    console.log("All product details", req.body);

    // creating the product object
    const product = { ...basic, pricing: null, attributes: null, seo: null, inventory: null };
    const uploadedProducts = await Product.create(product);
    console.log("Uploaded product", uploadedProducts);


    if (!uploadedProducts) {
        return ResponseHandler.error(res, null, "Products Not Created", 400);
    }

    // Upload images and associate with the product
    const imageIds = [];
    for (const image of images) {
        const uploadedImage = await handleImageUpload(
            "PRODUCT",
            uploadedProducts._id,
            "GALLERY",
            image.publicId,
            image.fileType,
        );
        imageIds.push(uploadedImage._id);
    }

    // Save image IDs to the product
    uploadedProducts.images = imageIds;

    // Upload thumbnail image and associate with the product
    const uploadedThumbnailImage = await handleImageUpload(
        "PRODUCT",
        uploadedProducts._id,
        "THUMBNAIL",
        thumbnail.publicId,
        thumbnail.fileType,
    );
    uploadedProducts.thumbnail = uploadedThumbnailImage._id;


    const uploadedProductPricing = await ProductPricing.create({ product: uploadedProducts._id, ...pricing })
    const uploadedProductAttributes = await ProductAttributes.create({ product: uploadedProducts._id, ...attributes })
    const uploadedProductSeo = await ProductSEO.create({ product: uploadedProducts._id, ...seo })
    const uploadedProductInventory = await ProductInventory.create({ product: uploadedProducts._id, ...inventory })

    uploadedProducts.pricing = uploadedProductPricing._id;
    uploadedProducts.attributes = uploadedProductAttributes._id;
    uploadedProducts.seo = uploadedProductSeo._id;
    uploadedProducts.inventory = uploadedProductInventory._id;
    const updatedProduct = await uploadedProducts.save();
    if (!updatedProduct) {
        return ResponseHandler.error(res, null, "Product Not Created", 400);
    }
    return ResponseHandler.success(res, uploadedProducts, "Products Created ", 200);
});


// controller to upoad images to the image model
export const handleImageUpload = async (entityType, entityId, imageType, publicId, fileType) => {
    try {
        // Save image details to the database
        console.log("Uploading image to database", { entityType, entityId, imageType, publicId, fileType });
        const newImage = new Image({
            entityType,
            entityId,
            imageType,
            publicId,
            fileType,
            metadata: {
                width: null,
                height: null,
                size: null,
            },
        });

        const savedImage = await newImage.save();
        return savedImage;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Image upload failed");
    }
};

// controller to get all products
// after filter based on category
export const getAllProducts = asyncHandler(async (req, res) => {
    const popularProducts = await Product.find({views:{$sort:-1}}).limit(10).populate("pricing").populate("attributes").populate("inventory").populate("seo").populate("images").populate("thumbnail").sort({ createdAt: -1 });
    if (!popularProducts) {
        return ResponseHandler.error(res, null, "Products Not Found", 400);
    }
    return ResponseHandler.success(res, popularProducts, "Products Found ", 200);
});