import asyncHandler from 'express-async-handler'
import { ResponseHandler } from "../../services/responseHandler";
import ProductSubCategory from '../../models/product/product_subcategory.model';

export const createSubcategory = asyncHandler(async (req, res) => {
    const { name, description, image, isActive, category } = req.body;
    const subcategory = await ProductSubCategory.create({
        name,
        description,
        image,
        isActive,
        category,
    });
    if (!subcategory) {
        return ResponseHandler.error(res, null, "Product Subcategory Not Created", 400);
    }
    return ResponseHandler.success(res, subcategory, "Product Subcategory Created ", 200);
});

export const getAllSubcategories = asyncHandler(async (req, res) => {
    const subcategories = await ProductSubCategory.find();

    if (!subcategories) {
        return ResponseHandler.error(res, null, "Product Subcategories Not Found", 400);
    }
    return ResponseHandler.success(res, subcategories, "Product Subcategories Found", 200);
});

export const getSubcategoryById = asyncHandler(async (req, res) => {
    const subcategory = await ProductSubCategory.findById(req.params.id);
    if (!subcategory) {
        return ResponseHandler.error(res, null, "Product Subcategory Not Found", 400);
    }
    return ResponseHandler.success(res, subcategory, "Product Subcategory Found", 200);
});

export const updateSubcategory = asyncHandler(async (req, res) => {
    const { name, description, image, isActive, category } = req.body;
    const subcategory = await ProductSubCategory.findById(req.params.id);
    if (!subcategory) {
        return ResponseHandler.error(res, null, "Product Subcategory Not Found", 400);
    }
    subcategory.name = name;
    subcategory.description = description;
    subcategory.image = image;
    subcategory.isActive = isActive;
    subcategory.category = category;
    await subcategory.save();
    return ResponseHandler.success(res, subcategory, "Product Subcategory Updated", 200);
});

export const deleteSubcategory = asyncHandler(async (req, res) => {
    const subcategory = await ProductSubCategory.findById(req.params.id);
    if (!subcategory) {
        return ResponseHandler.error(res, null, "Product Subcategory Not Found", 400);
    }
    await subcategory.remove();
    return ResponseHandler.success(res, null, "Product Subcategory Deleted", 200);
});

export const deleteAllSubcategories = asyncHandler(async (req, res) => {
    await ProductSubCategory.deleteMany({});
    return ResponseHandler.success(res, null, "All Product Subcategories Deleted", 200);
});

export const getSubcategoriesByCategory = asyncHandler(async (req, res) => {
    const subcategories = await ProductSubCategory.find({ category: req.params.id });
    if (!subcategories) {
        return ResponseHandler.error(res, null, "Product Subcategories Not Found", 400);
    }

    return ResponseHandler.success(res, subcategories, "Product Subcategories Found", 200);
});




