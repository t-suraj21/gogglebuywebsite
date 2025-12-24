import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

// ===================== USER MANAGEMENT =====================

// Get all users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.isActive).length,
      adminUsers: users.filter((u) => u.role === "admin").length
    };

    res.json({ users, stats });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// Get user by ID
router.get("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
});

// Update user role
router.put("/users/:id/role", adminAuth, async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    res.json({
      message: "User role updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
});

// Delete user
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

// ===================== PRODUCT MANAGEMENT =====================

// Get all products with stats
router.get("/products", adminAuth, async (req, res) => {
  try {
    const products = await Product.find()
      .populate("addedBy", "name email")
      .populate("lastModifiedBy", "name email")
      .sort({ createdAt: -1 });

    const stats = {
      totalProducts: products.length,
      outOfStock: products.filter(p => !p.inStock).length,
      newProducts: products.filter(p => p.isNew).length,
      inStock: products.filter(p => p.inStock).length
    };

    res.json({ products, stats });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// Get product stats
router.get("/products/stats", adminAuth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const outOfStock = await Product.countDocuments({ inStock: false });
    const newProducts = await Product.countDocuments({ isNew: true });

    const stats = {
      totalProducts,
      outOfStock,
      newProducts,
      inStock: totalProducts - outOfStock
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
});

// ===================== ORDER MANAGEMENT =====================

// Get order statistics
router.get("/orders/stats", adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "pending" });
    const deliveredOrders = await Order.countDocuments({ status: "delivered" });
    const totalRevenue = await Order.aggregate([
      { $match: { status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const stats = {
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalRevenue: totalRevenue[0]?.total || 0
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order stats", error: error.message });
  }
});

// Get dashboard data
router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const recentOrders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", count: { $sum: "$items.quantity" } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentOrders,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
});

export default router;
