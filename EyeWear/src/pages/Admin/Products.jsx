import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

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
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    category: "Eyeglasses",
    image: ""
  });

  // Fetch all products from localStorage
  const fetchProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
    setProducts(storedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.brand || !form.price || !form.category) {
      alert("Please fill all fields");
      return;
    }
    const newProduct = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price),
      addedAt: new Date().toLocaleString()
    };
    const storedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
    storedProducts.push(newProduct);
    localStorage.setItem("addedProducts", JSON.stringify(storedProducts));
    setForm({ name: "", brand: "", price: "", category: "Eyeglasses", image: "" });
    fetchProducts();
  };

  // Delete product
  const deleteProduct = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem("addedProducts") || "[]");
    const filtered = storedProducts.filter(p => p.id !== id);
    localStorage.setItem("addedProducts", JSON.stringify(filtered));
    fetchProducts();
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
            <FiPlus /> Add New Product
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              {PRODUCT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 lg:col-span-5"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition lg:col-span-5">
              <FiPlus className="inline mr-2" /> Add Product
            </button>
          </form>
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
                    <tr key={p.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-gray-900">{p.name}</td>
                      <td className="px-6 py-4 text-gray-700">{p.brand}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">₹{p.price}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{p.addedAt}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteProduct(p.id)}
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
