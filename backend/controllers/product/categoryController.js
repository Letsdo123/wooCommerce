import asyncHandler from 'express-async-handler'
import ProductCategory from "../../models/product/product_category.model.js";
import { ResponseHandler } from "../../services/responseHandler.js";

export const createCategory = asyncHandler(async (req, res) => {
    const { name, description, image, isActive } = req.body;
    const category = await ProductCategory.create({
        name,
        description,
        image,
        isActive : isActive == 'active' ? true : false,
    });
    if(!category){
        return ResponseHandler.error(res,null,"Product Category Not Created", 400)
    }

    return ResponseHandler.success(res, category, "Product Category Created ", 200)
});

export const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await ProductCategory.find();

    if(!categories){
        return ResponseHandler.error(res,null,"Product Categories Not Found", 400)
    }
    return ResponseHandler.success(res, categories, "Product Categories Found", 200)
})

export const getCategoryById = asyncHandler(async (req, res) => {
    const category = await ProductCategory.findById(req.params.id);
    if(!category){
        return ResponseHandler.error(res,null,"Product Category Not Found", 400)
    }
    return ResponseHandler.success(res, category, "Product Category Found", 200)
})

export const updateCategory = asyncHandler(async (req, res) => {
    const { name, description, image, isActive } = req.body;
    const category = await ProductCategory.findById(req.params.id);
    if(!category){
        return ResponseHandler.error(res,null,"Product Category Not Found", 400)
    }
    category.name = name;
    category.description = description;
    category.image = image;
    category.isActive = isActive;
    await category.save();
    return ResponseHandler.success(res, category, "Product Category Updated", 200)
})

export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await ProductCategory.findById(req.params.id);
    if(!category){
        return ResponseHandler.error(res,null,"Product Category Not Found", 400)
    }
    await category.remove();
    return ResponseHandler.success(res, null, "Product Category Deleted", 200)
})

export const deleteAllCategories = asyncHandler(async (req, res) => {
    await ProductCategory.deleteMany({});
    return ResponseHandler.success(res, null, "All Product Categories Deleted", 200)
})

export const getActiveCategories = asyncHandler(async (req, res) => {
    const categories = await ProductCategory.find({isActive: true});
    if(!categories){
        return ResponseHandler.error(res,null,"Product Categories Not Found", 400)
    }
    return ResponseHandler.success(res, categories, "Product Categories Found", 200)
})

export const getCategoriesByStatus = asyncHandler(async (req, res) => {
    const { active } = req.query;
    const isActive = active === 'true';
    const categories = await ProductCategory.find({ isActive });

    if (!categories || categories.length === 0) {
        return ResponseHandler.error(res, null, "Product Categories Not Found", 400);
    }
    return ResponseHandler.success(res, categories, "Product Categories Found", 200);
});
