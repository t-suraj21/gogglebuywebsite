import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

// Sample products from your frontend
const sampleProducts = [
  {
    _id: "1",
    name: "Premium Classic Aviator",
    brand: "Classic Collection",
    price: 2499,
    offer: 20,
    originalPrice: 3124,
    rating: 4.8,
    reviews: 245,
    images: [],
    category: "aviator",
    inStock: true,
    isNew: false,
    description: "Timeless classic aviator design with UV protection",
    stock: 100
  },
  {
    _id: "2",
    name: "Retro Round Style",
    brand: "Vintage Collection",
    price: 1999,
    offer: 15,
    originalPrice: 2352,
    rating: 4.6,
    reviews: 156,
    images: [],
    category: "round",
    inStock: true,
    isNew: false,
    description: "Vintage-inspired round frame eyewear",
    stock: 120
  }
];

// Sample users
const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user",
    avatar: "👤",
    isActive: true
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    avatar: "👨‍💼",
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log("🗑️  Cleared existing data...");

    // Insert sample users
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Insert sample products with admin user reference
    const adminUser = insertedUsers.find(u => u.role === "admin");
    const productsWithUser = sampleProducts.map(p => ({
      ...p,
      addedBy: adminUser._id
    }));

    const insertedProducts = await Product.insertMany(productsWithUser);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    console.log("✨ Database seeded successfully!");
    console.log("\n📝 Test Credentials:");
    console.log("User: john@example.com / password123");
    console.log("Admin: admin@example.com / admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
