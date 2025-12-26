import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/eyewear");
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Create Admin User
const createAdminUser = async () => {
  try {
    console.log("\n📝 Creating Admin User...");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@gogglebuy.com" });

    if (existingAdmin) {
      console.log("⚠️ Admin user already exists");
      console.log("Email:", existingAdmin.email);
      console.log("Name:", existingAdmin.name);
      console.log("Role:", existingAdmin.role);

      // Update role to admin if not already
      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        await existingAdmin.save();
        console.log("✅ Updated role to admin");
      }
      return;
    }

    // Create new admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@gogglebuy.com",
      password: "Admin@123",
      role: "admin",
      avatar: "👨‍💼"
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully!");
    console.log("\n📋 Admin Credentials:");
    console.log("   Email: admin@gogglebuy.com");
    console.log("   Password: Admin@123");
    console.log("   Role: admin");
    console.log("\n🔗 Login at: http://localhost:5173/login");
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    throw error;
  }
};

// Run seed
const seedDatabase = async () => {
  try {
    await connectDB();
    await createAdminUser();
    console.log("\n✅ Seeding completed successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();
