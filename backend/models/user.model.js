import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: function () {
      return !this.mobile
    }
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: function () {
      return !this.email
    }
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false,
  },
  addresses: [
    {
      name: String,
      mobile: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
      isDefault: { type: Boolean, default: false },
    },
  ],
  cart: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, default: 1 }
  }],
  wishlist: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  orders: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      orderedAt: { type: Date, default: Date.now },
    },
  ],
  paymentMethods: [
    {
      type: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'NetBanking', 'UPI', 'Wallet'],
      },
      provider: String,
      cardNumber: String, // For masked storage only (XXXX-XXXX-XXXX-1234)
      expiryDate: String, // MM/YY
      isDefault: { type: Boolean, default: false },
    },
  ],
  rewardPoints: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin'],
    default: 'customer',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  accountStatus: {
    type: String,
    enum: ['Active', 'Suspended', 'Deactivated'],
    default: 'Active',
  },
  notifications: [
    {
      type: { type: String }, // e.g., "Order", "Promotion"
      message: String,
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  profilePicture: {
    type: String, // URL to the stored profile picture
    default: '',
    required: false
  },
}, { timestamps: true })

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema)
export default User