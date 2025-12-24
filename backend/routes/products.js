import express from "express";
import Product from "../models/Product.js";
import { adminAuth, auth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const { category, search, inStock } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (inStock === "true") {
      query.inStock = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    const products = await Product.find(query)
      .populate("addedBy", "name email")
      .populate("lastModifiedBy", "name email")
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("addedBy", "name email")
      .populate("lastModifiedBy", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});

// Get products by category
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
      .populate("addedBy", "name email")
      .populate("lastModifiedBy", "name email");
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// Add product with image (Admin only)
router.post("/", adminAuth, upload.array("images", 5), async (req, res) => {
  try {
    const {
      _id,
      name,
      brand,
      price,
      offer,
      originalPrice,
      category,
      description,
      inStock,
      stock,
      isNew,
      specifications
    } = req.body;

    // Validation
    if (!_id || !name || !brand || !price || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if product already exists
    const existingProduct = await Product.findById(_id);
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this ID already exists" });
    }

    // Process images
    const images = req.files ? req.files.map(file => ({
      filename: file.filename,
      filepath: `/uploads/${file.filename}`,
      uploadedAt: new Date()
    })) : [];

    // Parse specifications if string
    let specs = {};
    if (specifications && typeof specifications === "string") {
      try {
        specs = JSON.parse(specifications);
      } catch (e) {
        specs = {};
      }
    } else if (specifications) {
      specs = specifications;
    }

    const product = new Product({
      _id,
      name,
      brand,
      price: parseFloat(price),
      offer: offer ? parseFloat(offer) : 0,
      originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price),
      category,
      images,
      description,
      inStock: inStock !== undefined ? inStock : true,
      stock: stock ? parseInt(stock) : 100,
      isNew: isNew || false,
      specifications: specs,
      addedBy: req.user._id
    });

    await product.save();

    // Populate user info before sending response
    await product.populate("addedBy", "name email");

    res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});

// Update product with optional image upload (Admin only)
router.put("/:id", adminAuth, upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      offer,
      originalPrice,
      category,
      description,
      inStock,
      stock,
      isNew,
      specifications
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update fields
    if (name) product.name = name;
    if (brand) product.brand = brand;
    if (price) product.price = parseFloat(price);
    if (offer !== undefined) product.offer = parseFloat(offer);
    if (originalPrice) product.originalPrice = parseFloat(originalPrice);
    if (category) product.category = category;
    if (description) product.description = description;
    if (inStock !== undefined) product.inStock = inStock;
    if (stock) product.stock = parseInt(stock);
    if (isNew !== undefined) product.isNew = isNew;

    // Add new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        filename: file.filename,
        filepath: `/uploads/${file.filename}`,
        uploadedAt: new Date()
      }));
      product.images = [...product.images, ...newImages];
    }

    // Update specifications
    if (specifications) {
      let specs = {};
      if (typeof specifications === "string") {
        try {
          specs = JSON.parse(specifications);
        } catch (e) {
          specs = specifications;
        }
      } else {
        specs = specifications;
      }
      product.specifications = specs;
    }

    product.lastModifiedBy = req.user._id;

    await product.save();
    await product.populate("addedBy", "name email");
    await product.populate("lastModifiedBy", "name email");

    res.json({
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
});

// Delete product image (Admin only)
router.delete("/:productId/images/:filename", adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Remove image from array
    product.images = product.images.filter(img => img.filename !== req.params.filename);
    
    product.lastModifiedBy = req.user._id;
    await product.save();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image", error: error.message });
  }
});

// Delete product (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

export default router;
