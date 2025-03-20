import mongoose from "mongoose";

const ProductPricingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  finalPrice: {
    type: Number,
    required: true,
  },
  taxPercentage: {
    type: Number,
    default: 0,
  },
  bulkDiscounts: [
    {
      minQuantity: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    },
  ],
  specialOffers: [
    {
      offer: {
        type: String,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    },
  ],
  couponCodes: [
    {
      code: {
        type: String,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      validFrom: {
        type: Date,
        required: true,
      },
      validTill: {
        type: Date,
        required: true,
      },
    },
  ],
});

// Auto-calculate final price
ProductPricingSchema.pre("save", function (next) {
  this.finalPrice = this.price - (this.price * this.discount) / 100;
  next();
});

const ProductPricing = mongoose.model("ProductPricing", ProductPricingSchema);
export default ProductPricing;
