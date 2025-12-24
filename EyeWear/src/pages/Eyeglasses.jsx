import { useState, useEffect } from "react";
import { FiEye, FiHeart, FiShoppingCart, FiStar, FiFilter, FiGrid, FiList, FiZap } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function Eyeglasses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const dispatch = useDispatch();

  const eyeglasses = [
    {
      id: 1,
      name: "Classic Round Reading Glasses",
      price: 1299,
      rating: 4.6,
      reviews: 234,
      badge: "Best Seller",
      category: "reading",
      frameType: "round",
      frameMaterial: "acetate",
      features: ["Lightweight", "Adjustable", "Anti-Scratch"],
      image: "/Image/2.jpeg",
      description: "Timeless round frames perfect for reading and close work"
    },
    {
      id: 2,
      name: "Modern Rectangle Frames",
      price: 1899,
      rating: 4.8,
      reviews: 189,
      badge: "Modern",
      category: "fashion",
      frameType: "rectangle",
      frameMaterial: "titanium",
      features: ["Titanium Frame", "Flexible", "Durable"],
      image: "/Image/17.jpeg",
      description: "Contemporary rectangular frames for the modern professional"
    },
    {
      id: 3,
      name: "Aviator Style Eyeglasses",
      price: 2499,
      rating: 4.7,
      reviews: 312,
      badge: "Classic",
      category: "prescription",
      frameType: "aviator",
      frameMaterial: "metal",
      features: ["UV Protection", "Polarized Available", "Comfort Fit"],
      image: "/Image/1.jpeg",
      description: "Iconic aviator style with premium lens options"
    },
    {
      id: 4,
      name: "Cat-Eye Fashion Frames",
      price: 2199,
      rating: 4.9,
      reviews: 156,
      badge: "Trending",
      category: "fashion",
      frameType: "cat-eye",
      frameMaterial: "acetate",
      features: ["Retro Design", "Lightweight", "Stylish"],
      image: "/Image/4.jpeg",
      description: "Vintage-inspired cat-eye frames for fashion-forward looks"
    },
    {
      id: 5,
      name: "Browline Optical Glasses",
      price: 1999,
      rating: 4.5,
      reviews: 98,
      badge: "Vintage",
      category: "prescription",
      frameType: "browline",
      frameMaterial: "acetate",
      features: ["Classic Style", "Comfortable", "Durable"],
      image: "/Image/12.jpeg",
      description: "Traditional browline frames with modern comfort"
    },
    {
      id: 6,
      name: "Oversized Square Frames",
      price: 2799,
      rating: 4.8,
      reviews: 267,
      badge: "Statement",
      category: "fashion",
      frameType: "square",
      frameMaterial: "titanium",
      features: ["Bold Design", "Lightweight", "Premium"],
      image: "/Image/6.jpeg",
      description: "Make a statement with these oversized square frames"
    },
    {
      id: 7,
      name: "Kids Fun Frames",
      price: 999,
      rating: 4.7,
      reviews: 145,
      badge: "Kids",
      category: "kids",
      frameType: "fun",
      frameMaterial: "plastic",
      features: ["Colorful", "Durable", "Fun Designs"],
      image: "/Image/3.jpeg",
      description: "Fun and colorful frames designed specifically for kids"
    },
    {
      id: 8,
      name: "Minimalist Wire Frames",
      price: 1599,
      rating: 4.4,
      reviews: 203,
      badge: "Minimal",
      category: "fashion",
      frameType: "wire",
      frameMaterial: "metal",
      features: ["Delicate", "Lightweight", "Elegant"],
      image: "/Image/19.jpeg",
      description: "Subtle wire frames for a clean, minimalist look"
    },
    {
      id: 9,
      name: "Progressive Lens Frames",
      price: 3299,
      rating: 4.6,
      reviews: 89,
      badge: "Progressive",
      category: "prescription",
      frameType: "progressive",
      frameMaterial: "titanium",
      features: ["Progressive Lenses", "Wide Field", "Comfortable"],
      image: "/Image/26.jpeg",
      description: "Premium frames designed for progressive lenses"
    },
    {
      id: 10,
      name: "Sport Performance Glasses",
      price: 2299,
      rating: 4.8,
      reviews: 176,
      badge: "Sport",
      category: "sports",
      frameType: "sport",
      frameMaterial: "polycarbonate",
      features: ["Impact Resistant", "Anti-Fog", "Secure Fit"],
      image: "/Image/5.jpeg",
      description: "High-performance frames for active lifestyles"
    }
  ];

  const categories = [
    { id: "all", name: "All Glasses", icon: FiEye },
    { id: "reading", name: "Reading", icon: FiEye },
    { id: "prescription", name: "Prescription", icon: FiEye },
    { id: "fashion", name: "Fashion", icon: FiStar },
    { id: "kids", name: "Kids", icon: FiHeart },
    { id: "sports", name: "Sports", icon: FiZap }
  ];

  const frameTypes = [
    { id: "round", name: "Round" },
    { id: "rectangle", name: "Rectangle" },
    { id: "aviator", name: "Aviator" },
    { id: "cat-eye", name: "Cat-Eye" },
    { id: "browline", name: "Browline" },
    { id: "square", name: "Square" },
    { id: "wire", name: "Wire" },
    { id: "progressive", name: "Progressive" },
    { id: "sport", name: "Sport" }
  ];

  const benefits = [
    {
      icon: FiEye,
      title: "Perfect Vision",
      description: "Crystal clear lenses for optimal visual clarity"
    },
    {
      icon: FiStar,
      title: "Style Variety",
      description: "Wide range of frame styles to match your personality"
    },
    {
      icon: FiHeart,
      title: "Comfort Fit",
      description: "Ergonomically designed frames for all-day comfort"
    },
    {
      icon: FiStar,
      title: "Premium Quality",
      description: "High-quality materials and expert craftsmanship"
    }
  ];

  const filteredProducts = eyeglasses.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id; // Assuming higher ID = newer
      case "popular":
      default:
        return b.reviews - a.reviews;
    }
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };

  const gridColsClass = viewMode === "grid"
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid-cols-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <FiEye size={32} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Eyeglasses Collection</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover our complete collection of eyeglasses. From classic reading glasses
            to trendy fashion frames, find the perfect pair for your style and vision needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">Premium Frames</div>
            <div className="bg-white/20 px-4 py-2 rounded-full">All Styles</div>
            <div className="bg-white/20 px-4 py-2 rounded-full">Expert Fitting</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Eyeglasses?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect combination of style, comfort, and vision clarity
              with our carefully curated collection of eyeglasses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <benefit.icon size={28} className="text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === category.id
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <category.icon size={16} />
                  {category.name}
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>

              <div className="flex bg-white border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-600"}`}
                >
                  <FiGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-600"}`}
                >
                  <FiList size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              Showing products between ₹{priceRange[0]} - ₹{priceRange[1]}
            </div>
          </div>

          {/* Products Grid/List */}
          <div className={`grid gap-8 ${gridColsClass}`}>
            {sortedProducts.map((product) => (
              <div key={product.id} className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group ${viewMode === "list" ? "flex" : ""}`}>
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-80 flex-shrink-0" : ""}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`object-cover group-hover:scale-110 transition-transform duration-500 ${viewMode === "list" ? "w-full h-48" : "w-full h-64"}`}
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition">
                      <FiHeart size={16} />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition flex items-center gap-2"
                    >
                      <FiShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className={`flex ${viewMode === "list" ? "justify-between items-start" : "flex-col"}`}>
                    <div className={viewMode === "list" ? "flex-1" : ""}>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400 fill-current" size={14} />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.features.slice(0, viewMode === "list" ? 3 : 2).map((feature, index) => (
                          <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Frame:</span> {product.frameType} • <span className="font-medium">Material:</span> {product.frameMaterial}
                      </div>
                    </div>
                    <div className={viewMode === "list" ? "ml-6 text-right" : ""}>
                      <div className="text-2xl font-bold text-gray-900 mb-2">₹{product.price}</div>
                      <Link
                        to={`/product/${product.id}`}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <FiEye size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No eyeglasses found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new arrivals.</p>
            </div>
          )}
        </div>
      </section>

      {/* Frame Types Guide */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frame Styles Guide</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Understanding different eyeglass frame styles to find your perfect match.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {frameTypes.map((type, index) => (
              <div key={type.id} className="text-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FiEye size={24} />
                </div>
                <h3 className="font-bold text-sm mb-1">{type.name}</h3>
                <p className="text-xs text-gray-300">
                  {type.id === "round" && "Classic and intellectual"}
                  {type.id === "rectangle" && "Modern and professional"}
                  {type.id === "aviator" && "Iconic and versatile"}
                  {type.id === "cat-eye" && "Retro and feminine"}
                  {type.id === "browline" && "Traditional and bold"}
                  {type.id === "square" && "Angular and trendy"}
                  {type.id === "wire" && "Delicate and elegant"}
                  {type.id === "progressive" && "Advanced vision correction"}
                  {type.id === "sport" && "Durable and functional"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Finding Your Perfect Fit</h2>
            <p className="text-gray-600">
              Use our size guide to ensure your new eyeglasses fit comfortably.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-2">Lens Width</div>
                <p className="text-gray-700">Distance between lenses (typically 40-60mm)</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-2">Bridge Width</div>
                <p className="text-gray-700">Distance between lenses over nose (typically 14-24mm)</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-2">Temple Length</div>
                <p className="text-gray-700">Length of arms (typically 120-150mm)</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600 mb-4">
                Not sure about your size? Visit our store for a professional fitting.
              </p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
