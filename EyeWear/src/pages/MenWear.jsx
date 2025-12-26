import { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import AdminMenuWrapper from "../components/AdminMenuWrapper";
import { gogglesProducts } from "../data/products";
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiHome } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import MobileAddToCartButton from "../components/MobileAddToCartButton";

export default function MenWear() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const cartItems = useSelector((state) => state.cart.items || []);
  const cartCount = cartItems.length;
  const user = useSelector((state) => state.auth.user);

  // Filter products for men wear - you can customize this filter based on your product data
  const menProducts = gogglesProducts.filter(p => 
    !p.category?.toLowerCase().includes("kids") && 
    !p.category?.toLowerCase().includes("child")
  );

  const brands = [...new Set(menProducts.map(p => p.brand))].filter(Boolean);

  const filtered = menProducts.filter((product) => {
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = product.price <= priceRange;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;
    
    return matchesSearch && matchesPrice && matchesBrand;
  });

  // Sort products
  const sortedProducts = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <FiHome size={28} className="text-blue-600" />
              <span className="text-blue-600">BUYCHASHME</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <form onSubmit={handleSearch} className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600 transition">
                  <FiSearch size={18} />
                </button>
              </form>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/cart')}
                  className="relative text-gray-700 hover:text-blue-600 transition cursor-pointer bg-none border-none p-0"
                >
                  <FiShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {user ? (
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full hover:bg-blue-100 transition">
                    <FiUser size={20} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{user.name?.split(" ")[0]}</span>
                  </div>
                ) : (
                  <button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                    Login
                  </button>
                )}
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-700">
                <FiSearch size={20} />
              </button>
              <button 
                onClick={() => navigate('/cart')}
                className="relative text-gray-700 cursor-pointer bg-none border-none p-0"
              >
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>

          {isSearchOpen && (
            <form onSubmit={handleSearch} className="mt-4 md:hidden">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
          )}

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
              <Link to="/home" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Home</Link>
              <Link to="/male-wear" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded font-semibold text-blue-600">Men Wear</Link>
              <Link to="/female-wear" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Female Wear</Link>
              <Link to="/child-wear" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Child Wear</Link>
            </div>
          )}
        </div>
      </nav>

      <AdminMenuWrapper />

      {/* Sub Navigation with Wear Types */}
      <section className="bg-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 py-3 text-sm font-semibold">
            <Link to="/home" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/male-wear" className="text-blue-600 font-bold">Men Wear</Link>
            <span className="text-gray-400">/</span>
            <Link to="/female-wear" className="text-gray-700 hover:text-blue-600 transition">Female Wear</Link>
            <span className="text-gray-400">/</span>
            <Link to="/child-wear" className="text-gray-700 hover:text-blue-600 transition">Child Wear</Link>
          </div>
        </div>
      </section>

      {/* Page Title */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900">Men Wear Eyeglasses</h1>
          <p className="text-gray-600 mt-2">Premium eyewear collection for men</p>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-32">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">₹0 - ₹{priceRange.toLocaleString()}</p>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              {/* Reset */}
              <button
                onClick={() => {
                  setPriceRange(5000);
                  setSelectedBrand("");
                  setSortBy("featured");
                  setSearchQuery("");
                }}
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-700 font-medium">
                Showing <span className="font-bold">{sortedProducts.length}</span> products
              </p>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setPriceRange(5000);
                    setSelectedBrand("");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
