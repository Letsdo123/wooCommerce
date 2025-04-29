import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // Default quantity is 1
        },
        addedAt: {
          type: Date,
          default: Date.now, // Timestamp when the product was added to the cart
        },
      },
    ],
    totalItems: {
      type: Number,
      default: 0, // Total number of items in the cart
    },
    totalPrice: {
      type: Number,
      default: 0, // Total price of all items in the cart
    },
    isActive: {
      type: Boolean,
      default: true, // Whether the cart is active or not
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;


const cartDetails = await Cart.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(userId) }, // Match the cart by user ID
    },
    {
      $unwind: "$items", // Unwind the items array
    },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails", // Unwind the product details
    },
    {
      $lookup: {
        from: "productpricings",
        localField: "productDetails.pricing",
        foreignField: "_id",
        as: "pricingDetails",
      },
    },
    {
      $unwind: "$pricingDetails", // Unwind the pricing details
    },
    {
      $lookup: {
        from: "productattributes",
        localField: "productDetails.attributes",
        foreignField: "_id",
        as: "attributesDetails",
      },
    },
    {
      $unwind: "$attributesDetails", // Unwind the attributes details
    },
    {
      $group: {
        _id: "$_id",
        user: { $first: "$user" },
        items: {
          $push: {
            product: "$productDetails",
            quantity: "$items.quantity",
            pricing: "$pricingDetails",
            attributes: "$attributesDetails",
          },
        },
        totalItems: { $sum: "$items.quantity" },
        totalPrice: {
          $sum: {
            $multiply: ["$pricingDetails.finalPrice", "$items.quantity"],
          },
        },
      },
    },
  ]);