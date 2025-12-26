import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiStar } from "react-icons/fi";
import api from "../../services/api";

const PRODUCT_CATEGORIES = [
  "Eyeglasses",
  "Sunglasses",
  "Computer Glasses",
  "Kids Glasses",
  "Half Rim Frames",
  "Rimless Frames",
  "Contact Lenses",
  "Deals"
];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "Eyeglasses",
    image: "",
    inStock: true,
    stock: 100,
    description: ""
  });

  // Fetch all products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products. Using local data.");
      const storedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
      setProducts(storedProducts);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add/Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.price || !form.category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingProduct) {
        // Update product
        await api.put(`/admin/products/${editingProduct._id}`, {
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock)
        });
        alert("Product updated successfully");
      } else {
        // Add new product
        await api.post("/admin/products", {
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock)
        });
        alert("Product added successfully");
      }
      setForm({ name: "", brand: "", price: "", category: "Eyeglasses", image: "", inStock: true, stock: 100, description: "" });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await api.delete(`/admin/products/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  // Feature/Unfeature product
  const toggleFeature = async (product) => {
    try {
      await api.put(`/admin/products/${product._id}/feature`, {
        featured: !product.isNew
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating feature status:", error);
      alert("Error updating feature status");
    }
  };

  // Edit product
  const editProduct = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      brand: product.brand,
      price: product.price,
      category: product.category,
      image: product.images?.[0]?.filepath || "",
      inStock: product.inStock,
      stock: product.stock,
      description: product.description
    });
  };

  // Filter products by category
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Product Management</h1>

        {/* ADD PRODUCT FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <FiPlus /> {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              placeholder="Price (₹)"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <input
              placeholder="Stock"
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {PRODUCT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 border-2 border-gray-300 p-3 rounded-lg cursor-pointer bg-blue-50">
              <input
                type="checkbox"
                checked={form.inStock}
                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                className="w-4 h-4"
              />
              In Stock
            </label>
          </form>
          <textarea
            placeholder="Product Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 mt-4"
            rows="3"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            {editingProduct && (
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setForm({ name: "", brand: "", price: "", category: "Eyeglasses", image: "", inStock: true, stock: 100, description: "" });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        {/* CATEGORY FILTER */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-gray-900">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All ({products.length})
            </button>
            {PRODUCT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {cat} ({products.filter(p => p.category === cat).length})
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT LIST TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Product Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Brand</th>
                  <th className="px-6 py-4 text-left font-semibold">Category</th>
                  <th className="px-6 py-4 text-left font-semibold">Price</th>
                  <th className="px-6 py-4 text-left font-semibold">Added</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <tr key={p._id || p.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-900">{p.name}</td>
                      <td className="px-6 py-4 text-gray-700">{p.brand}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">₹{p.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : p.addedAt}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => editProduct(p)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition flex items-center gap-1"
                        >
                          <FiEdit2 /> Edit
                        </button>
                        <button
                          onClick={() => toggleFeature(p)}
                          className={`p-2 rounded-lg transition flex items-center gap-1 ${
                            p.isNew
                              ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                          }`}
                          title={p.isNew ? 'Remove from featured' : 'Add to featured'}
                        >
                          <FiStar fill={p.isNew ? 'currentColor' : 'none'} /> {p.isNew ? 'Featured' : 'Feature'}
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id || p.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition flex items-center gap-1"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No products found in this category
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
