import mongoose from "mongoose";

//only core product details and reference other sub-models.
const ProductSchema = new mongoose.Schema(
  {
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
      // unique: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    tags: [
      {
        type: String,
      },
    ],


    // some extra field to categorise the products
    
    // for top rated products
    rating:{
      type: Number,
      default: 0,
    },
    // for top selling products
    sales:{
      type: Number,
      default: 0,
    },
    // for top viewed products
    views:{
      type: Number,
      default: 0,
    },
    // for top discount products
    discount:{
      type: Number,
      default: 0,
    },

    // reference sub-models
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ProductCategory",
    //   required: true,
    // },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSubCategory",
      // required: true,
    },
    pricing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductPricing",
      // required: true,
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductInventory",
      // required: true,
    },
    attributes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductAttributes",
      // required: true,
    },
    seller: {
      type: mongoose.Schema.Types.Mixed,
      // required: true,
    },
    logistics: {
      type: mongoose.Schema.Types.Mixed,
      // required: true,
      default: null,
    },
    seo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSEO",
      // required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
