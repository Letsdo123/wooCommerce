import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema)
export default ProductCategory