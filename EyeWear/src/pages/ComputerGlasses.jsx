import { useState, useEffect } from "react";
import { FiMonitor, FiEye, FiShield, FiZap, FiStar, FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function ComputerGlasses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const dispatch = useDispatch();

  const computerGlasses = [
    {
      id: 1,
      name: "Blue Light Shield Pro",
      price: 2499,
      originalPrice: 2999,
      rating: 4.8,
      badge: "Best Seller",
      category: "anti-blue-light",
      features: ["99% Blue Light Blocking", "Anti-Glare Coating", "Lightweight Frame"],
      image: "/Image/10.jpeg",
      description: "Advanced blue light protection for extended screen time"
    },
    {
      id: 2,
      name: "Digital Eye Comfort",
      price: 1999,
      originalPrice: 2499,
      rating: 4.6,
      reviews: 89,
      badge: "20% OFF",
      category: "comfort",
      features: ["UV Protection", "Computer Lens", "Adjustable Fit"],
      image: "/Image/7.jpeg",
      description: "Designed specifically for digital device users"
    },
    {
      id: 3,
      name: "Gamer's Edge Pro",
      price: 3299,
      originalPrice: 3999,
      rating: 4.9,
      reviews: 203,
      badge: "Gaming Special",
      category: "gaming",
      features: ["Anti-Flicker Technology", "Enhanced Contrast", "Gaming Optimized"],
      image: "/Image/30.jpeg",
      description: "Ultimate protection for gaming enthusiasts"
    },
    {
      id: 4,
      name: "Office Professional",
      price: 1799,
      originalPrice: 2199,
      rating: 4.4,
      reviews: 67,
      badge: "Office Ready",
      category: "office",
      features: ["Blue Light Filter", "Reading Lens", "Professional Look"],
      image: "/Image/11.jpeg",
      description: "Perfect for office workers and professionals"
    },
    {
      id: 5,
      name: "Kids Screen Shield",
      price: 1499,
      originalPrice: 1899,
      rating: 4.7,
      reviews: 134,
      badge: "Kids Friendly",
      category: "kids",
      features: ["Child-Safe Design", "Durable Frame", "Fun Colors"],
      image: "/Image/3.jpeg",
      description: "Protect young eyes from harmful blue light"
    },
    {
      id: 6,
      name: "Designer Blue Block",
      price: 2899,
      originalPrice: 3499,
      rating: 4.5,
      reviews: 78,
      badge: "Designer",
      category: "designer",
      features: ["Premium Materials", "Stylish Design", "Maximum Protection"],
      image: "/Image/32.jpeg",
      description: "Style meets functionality in this premium design"
    }
  ];

  const categories = [
    { id: "all", name: "All Glasses", icon: FiMonitor },
    { id: "anti-blue-light", name: "Anti Blue Light", icon: FiShield },
    { id: "gaming", name: "Gaming", icon: FiZap },
    { id: "office", name: "Office", icon: FiMonitor },
    { id: "kids", name: "Kids", icon: FiEye },
    { id: "designer", name: "Designer", icon: FiStar }
  ];

  const benefits = [
    {
      icon: FiShield,
      title: "Blue Light Protection",
      description: "Blocks up to 99% of harmful blue light from screens"
    },
    {
      icon: FiEye,
      title: "Eye Comfort",
      description: "Reduces eye strain and fatigue from prolonged screen time"
    },
    {
      icon: FiZap,
      title: "Enhanced Focus",
      description: "Improves contrast and clarity for better screen visibility"
    },
    {
      icon: FiStar,
      title: "Stylish Design",
      description: "Modern frames that complement your professional look"
    }
  ];

  const filteredProducts = selectedCategory === "all"
    ? computerGlasses
    : computerGlasses.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <FiMonitor size={32} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Computer Glasses</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Protect your eyes from harmful blue light while working, gaming, or browsing.
            Experience crystal clear vision with our premium computer eyewear collection.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">99% Blue Light Blocking</div>
            <div className="bg-white/20 px-4 py-2 rounded-full">Anti-Glare Coating</div>
            <div className="bg-white/20 px-4 py-2 rounded-full">UV Protection</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Computer Glasses?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Modern life involves hours of screen time. Our computer glasses provide essential protection
              while maintaining comfort and style.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <benefit.icon size={28} className="text-blue-600" />
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
          {/* Filters and Sort */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <category.icon size={16} />
                  {category.name}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
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
                      className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <FiShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-6">
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
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <FiMonitor size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new arrivals.</p>
            </div>
          )}
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Understanding Blue Light</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">What is Blue Light?</h3>
                    <p className="text-gray-300">High-energy visible (HEV) light emitted by digital screens, LED lights, and the sun.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Health Impact</h3>
                    <p className="text-gray-300">Can cause eye strain, sleep disruption, and long-term retinal damage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Protection Matters</h3>
                    <p className="text-gray-300">Computer glasses with blue light filters provide essential protection for digital lifestyles.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Daily Screen Time Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average daily screen time</span>
                  <span className="font-bold text-blue-400">7-9 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>People experiencing eye strain</span>
                  <span className="font-bold text-blue-400">70%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Blue light exposure increase</span>
                  <span className="font-bold text-blue-400">200%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Children with digital eye strain</span>
                  <span className="font-bold text-blue-400">60%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
