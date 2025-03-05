import mongoose from "mongoose";

//only core product details and reference other sub-models.
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  sku: {
    type: String,
    unique: true,
  },
  images: [
    {
      type: String,
    },
  ],
  thumbnail: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
  slug: {
    type: String,
    unique: true,
  },

  // reference sub-models

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductSubCategory",
        required: true,
    },
    pricing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductPricing",
        required: true,
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductInventory",
        required: true,
    },
    attributes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductAttributes",
        required: true,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },
    logistics: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Logistics",
        required: true,
    },
    seo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductSEO",
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
