import express from "express";
import Order from "../models/Order.js";
import { auth, adminAuth } from "../middleware/auth.js";

const router = express.Router();

// Place order
router.post("/", auth, async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      payment,
      subtotal,
      tax,
      shipping,
      total
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    const order = new Order({
      userId: req.user._id,
      items,
      shippingAddress,
      billingAddress,
      payment,
      subtotal,
      tax,
      shipping,
      total,
      status: "pending"
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

// Get user orders
router.get("/user/:userId", auth, async (req, res) => {
  try {
    // Check if user is requesting their own orders or is admin
    if (req.user._id.toString() !== req.params.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

// Get single order
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check authorization
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});

// Update order status (Admin)
router.put("/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
});

// Get all orders (Admin)
router.get("/", adminAuth, async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("userId", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalOrders: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
});

export default router;
