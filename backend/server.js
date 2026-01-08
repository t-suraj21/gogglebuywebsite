import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";

// Import routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import adminRoutes from "./routes/admin.js";

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

// Load environment variables
dotenv.config();

console.log("🔧 Configuration:");
console.log("   JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Not set");
console.log("   MongoDB URI:", process.env.MONGODB_URI || "mongodb://localhost:27017/eyewear");
console.log("   NODE_ENV:", process.env.NODE_ENV || "development");

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors({
  origin: ["https://gogglebuywebsite.onrender.com", "http://localhost:3000", "http://localhost:8001"],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Connect to database
console.log("🔌 Connecting to MongoDB...");
connectDB().then(() => {
  console.log("✅ MongoDB connection successful");
}).catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);


app.use(express.static(path.join(__dirname, "/EyeWear/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "EyeWear", "dist", "index.html"));
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Internal server error", 
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

app.use

// Start server
app.listen(PORT, () => {
  console.log("\n🚀 ════════════════════════════════════════════════════════");
  console.log(`   Server running at: http://localhost:${PORT}`);
  console.log(`   API Base URL: http://localhost:${PORT}/api`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("════════════════════════════════════════════════════════\n");
});
