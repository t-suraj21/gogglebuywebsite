import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    console.log("📝 Register request received:", { name, email, password: "***", confirmPassword: "***" });

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      console.error("❌ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate name
    if (typeof name !== "string" || name.trim().length < 2) {
      console.error("❌ Invalid name:", name);
      return res.status(400).json({ message: "Name must be at least 2 characters" });
    }

    // Validate email format - more lenient
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("❌ Invalid email:", email);
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (password !== confirmPassword) {
      console.error("❌ Passwords do not match");
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      console.error("❌ Password too short");
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (password.length > 128) {
      console.error("❌ Password too long");
      return res.status(400).json({ message: "Password is too long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.error("❌ User already exists:", email);
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role: "user"
    });

    console.log("💾 Saving user to MongoDB...");
    await user.save();
    console.log("✅ User saved successfully:", user._id);

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error("❌ Register error:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔐 Login attempt:", { email, password: "***" });

    if (!email || !password) {
      console.error("❌ Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user with lowercase email and select password
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      console.error("❌ User not found with email:", email.toLowerCase());
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      console.error("❌ Invalid password for user:", email.toLowerCase());
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ Login successful for user:", user._id);

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, address },
      { new: true, runValidators: true }
    );

    res.json({
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
});

// Change password
router.post("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password must be different from current password" });
    }

    // Get user with password field
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Error changing password", error: error.message });
  }
});

export default router;
