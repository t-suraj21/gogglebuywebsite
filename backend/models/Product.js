import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"]
    },
    offer: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
      description: "Discount percentage"
    },
    originalPrice: {
      type: Number,
      default: 0,
      description: "Original price before discount"
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      required: true,
      enum: [
        "aviator",
        "round",
        "wayfarer",
        "cat-eye",
        "sports",
        "oversized",
        "classic",
        "trendy",
        "rimless",
        "computer",
        "kids",
        "halfrim",
        "contact-lenses",
        "eyeglasses",
        "sunglasses"
      ]
    },
    images: [
      {
        filename: String,
        filepath: String,
        uploadedAt: { type: Date, default: Date.now }
      }
    ],
    inStock: {
      type: Boolean,
      default: true
    },
    stock: {
      type: Number,
      default: 100,
      min: 0
    },
    isNew: {
      type: Boolean,
      default: false
    },
    specifications: {
      material: String,
      frameSize: String,
      lensType: String,
      color: String,
      weight: String,
      style: String,
      customFields: {
        type: Map,
        of: String
      }
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
