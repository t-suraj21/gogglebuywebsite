import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        productId: {
          type: String,
          required: true
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        image: String
      }
    ],
    shippingAddress: {
      fullName: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    billingAddress: {
      fullName: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    payment: {
      method: {
        type: String,
        enum: ["card", "upi", "net-banking", "wallet"],
        default: "card"
      },
      lastFourDigits: String,
      status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "completed"
      }
    },
    subtotal: Number,
    tax: Number,
    shipping: Number,
    total: Number,
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    trackingNumber: String,
    notes: String
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
