import mongoose from "mongoose";


const ProductInventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    stockStatus: {
        type: String,
        enum: ["In Stock","Low Stock", "Out of Stock"],
        default: "In Stock",
    },
    soldCount: {
        type: Number,
        default: 0,
    },
    restockDate: {
        type: Date,
        default: null,
    },
    

})

const ProductInventory = mongoose.model("ProductInventory", ProductInventorySchema);
export default ProductInventory;