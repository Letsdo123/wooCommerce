import mongoose from "mongoose";


const ProductSubCategorySchema = mongoose.Schema({
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true
    }
}, { timestamps: true });

const ProductSubCategory = mongoose.model('ProductSubCategory', ProductSubCategorySchema);
export default ProductSubCategory;
