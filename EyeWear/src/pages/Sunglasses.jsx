import { useState } from "react";
import { Heart, ShoppingCart, Star, Sun, Shield, Eye, Award, Truck, RefreshCw, Search, Filter, ChevronRight, Zap, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import AuthModal from "../components/AuthModal";
import MobileAddToCartButton from "../components/MobileAddToCartButton";

export default function Sunglasses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const products = [
    {
      id: 1,
      name: "Aviator Classic Gold",
      price: 4999,
      originalPrice: 6999,
      rating: 4.9,
      reviews: 342,
      badge: "Bestseller",
      category: "aviator",
      uvProtection: "UV400",
      polarized: true,
      image: "/Image/1.jpeg",
      description: "Timeless aviator sunglasses with premium gold finish and polarized lenses",
      features: ["Polarized", "UV400 Protection", "Metal Frame"]
    },
    {
      id: 2,
      name: "Retro Round Vintage",
      price: 3999,
      originalPrice: 5499,
      rating: 4.7,
      reviews: 278,
      badge: "Trending",
      category: "round",
      uvProtection: "UV400",
      polarized: true,
      image: "/Image/2.jpeg",
      description: "Vintage-inspired round sunglasses perfect for a retro look",
      features: ["Vintage Style", "Lightweight", "UV Protection"]
    },
    {
      id: 3,
      name: "Sport Shield Pro",
      price: 5499,
      originalPrice: 7999,
      rating: 4.8,
      reviews: 412,
      badge: "Sport",
      category: "sport",
      uvProtection: "UV400",
      polarized: true,
      image: "/Image/30.jpeg",
      description: "High-performance sport sunglasses with wrap-around protection",
      features: ["Anti-Slip", "Impact Resistant", "Polarized"]
    },
    {
      id: 4,
      name: "Wayfarer Black Classic",
      price: 3499,
      originalPrice: 4999,
      rating: 4.9,
      reviews: 567,
      badge: "Classic",
      category: "wayfarer",
      uvProtection: "UV400",
      polarized: false,
      image: "/Image/3.jpeg",
      description: "Iconic wayfarer design that never goes out of style",
      features: ["Classic Design", "Durable", "All-Day Comfort"]
    },
    {
      id: 5,
      name: "Aviator Pilot Black",
      price: 4799,
      originalPrice: 6499,
      rating: 4.8,
      reviews: 289,
      badge: "Premium",
      category: "aviator",
      uvProtection: "UV400",
      polarized: true,
      image: "/Image/4.jpeg",
      description: "Professional pilot-style aviators with superior lens quality",
      features: ["Pilot Grade", "Polarized", "Premium Build"]
    },
    {
      id: 6,
      name: "Cat Eye Fashion",
      price: 3799,
      originalPrice: 5299,
      rating: 4.6,
      reviews: 234,
      badge: "Fashion",
      category: "cateye",
      uvProtection: "UV400",
      polarized: false,
      image: "/Image/4.jpeg",
      description: "Chic cat-eye sunglasses for a bold fashion statement",
      features: ["Fashion Forward", "Lightweight", "UV Protection"]
    },
    {
      id: 7,
      name: "Round Gradient Style",
      price: 4299,
      originalPrice: 5999,
      rating: 4.7,
      reviews: 198,
      badge: "New",
      category: "round",
      uvProtection: "UV400",
      polarized: true,
      image: "/Image/35.jpeg",
      description: "Modern round frames with stylish gradient lenses",
      features: ["Gradient Lens", "Metal Frame", "Polarized"]
    },
    {
      id: 8,
      name: "Sport Runner Shield",
      price: 4999,
      originalPrice: 6999,
      rating: 4.9,
      reviews: 445,
      badge: "Sport",
      category: "sport",
      uvProtection: "UV400",
      polarized: true,
      image: "/Image/36.jpeg",
      description: "Designed for runners and athletes with maximum coverage",
      features: ["Lightweight", "No-Slip Grip", "Wind Resistant"]
    },
    {
      id: 9,
      name: "Wayfarer Tortoise",
      price: 3899,
      originalPrice: 5499,
      rating: 4.7,
      reviews: 312,
      badge: "Classic",
      category: "wayfarer",
      uvProtection: "UV400",
      polarized: false,
      image: "/Image/21.jpeg",
      description: "Classic wayfarer with sophisticated tortoise pattern",
      features: ["Acetate Frame", "Comfortable", "Timeless"]
    },
    {
      id: 10,
      name: "Oversized Glam",
      price: 4599,
      originalPrice: 6299,
      rating: 4.6,
      reviews: 267,
      badge: "Luxury",
      category: "oversized",
      uvProtection: "UV400",
      polarized: true,
      image: "/Image/6.jpeg",
      description: "Oversized glamorous sunglasses for maximum style impact",
      features: ["Oversized", "Polarized", "Luxury Finish"]
    },
    {
      id: 11,
      name: "Square Modern Edge",
      price: 4199,
      originalPrice: 5799,
      rating: 4.8,
      reviews: 189,
      badge: "Modern",
      category: "square",
      uvProtection: "UV400",
      polarized: true,
      image: "/Image/15.jpeg",
      description: "Contemporary square frames with sharp, modern lines",
      features: ["Modern Design", "Lightweight", "Polarized"]
    },
    {
      id: 12,
      name: "Clubmaster Vintage",
      price: 4399,
      originalPrice: 5999,
      rating: 4.7,
      reviews: 298,
      badge: "Vintage",
      category: "clubmaster",
      uvProtection: "UV400",
      polarized: false,
      image: "/Image/11.jpeg",
      description: "Vintage clubmaster style combining metal and acetate",
      features: ["Retro Style", "Durable", "Classic Look"]
    }
  ];

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product) => {
    // Check if user is logged in
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    dispatch(addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));

    // Redirect to cart
    navigate("/cart");
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const searchMatch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let priceMatch = true;
    if (selectedPriceRange === "under4000") priceMatch = product.price < 4000;
    else if (selectedPriceRange === "4000-5000") priceMatch = product.price >= 4000 && product.price <= 5000;
    else if (selectedPriceRange === "above5000") priceMatch = product.price > 5000;
    
    return categoryMatch && priceMatch && searchMatch;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1920&q=80"
            alt="Sunglasses Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/30">
              <Sun className="text-amber-300" size={20} />
              <span className="text-white font-medium text-sm">Summer Collection 2024</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-none">
              Premium
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Sunglasses
              </span>
            </h1>
            
            <p className="text-2xl text-gray-200 mb-8 leading-relaxed">
              Protect your eyes in style with our curated collection of premium sunglasses. UV400 protection, polarized lenses, and timeless designs.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all flex items-center gap-3 shadow-2xl">
                <ShoppingCart size={24} />
                Shop Collection
              </button>
              <button className="bg-white/20 backdrop-blur-md border-2 border-white/50 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all">
                Virtual Try-On
              </button>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="text-amber-400" size={24} />
                <span className="text-white font-medium">UV400 Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="text-amber-400" size={24} />
                <span className="text-white font-medium">Polarized Lenses</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="text-white rotate-90" size={32} />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield size={32} />
              <div className="font-bold">100% UV Protection</div>
              <div className="text-sm text-amber-100">Certified UV400</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck size={32} />
              <div className="font-bold">Free Shipping</div>
              <div className="text-sm text-amber-100">Orders above ₹3499</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RefreshCw size={32} />
              <div className="font-bold">30-Day Returns</div>
              <div className="text-sm text-amber-100">No hassle policy</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award size={32} />
              <div className="font-bold">Premium Quality</div>
              <div className="text-sm text-amber-100">Guaranteed authentic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
              <Zap size={16} />
              Why Choose Our Sunglasses
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Protect Your Eyes in Style</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our premium sunglasses combine cutting-edge protection technology with timeless style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">UV400 Protection</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete protection against harmful UVA and UVB rays. Our lenses block 100% of UV radiation up to 400nm, keeping your eyes safe and healthy.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Polarized Lenses</h3>
              <p className="text-gray-600 leading-relaxed">
                Eliminate glare and enhance visual clarity. Our polarized lenses reduce eye strain and provide crystal-clear vision in bright conditions.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Materials</h3>
              <p className="text-gray-600 leading-relaxed">
                Crafted from high-quality acetate and metal alloys. Lightweight, durable, and designed to withstand daily wear while maintaining their stylish appearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Explore Our Collection</h2>
            <p className="text-xl text-gray-600">Find your perfect pair from our premium selection</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border-2 border-amber-100">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Search for your perfect sunglasses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-lg"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="all">All Styles</option>
                  <option value="aviator">Aviator</option>
                  <option value="wayfarer">Wayfarer</option>
                  <option value="round">Round</option>
                  <option value="sport">Sport</option>
                  <option value="cateye">Cat Eye</option>
                  <option value="square">Square</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price Range</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  <option value="all">All Prices</option>
                  <option value="under4000">Under ₹4000</option>
                  <option value="4000-5000">₹4000 - ₹5000</option>
                  <option value="above5000">Above ₹5000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8 flex items-center justify-between">
            <div className="text-lg text-gray-600">
              Found <span className="font-bold text-gray-900">{sortedProducts.length}</span> sunglasses
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border-2 border-gray-100">
                <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-amber-50 to-orange-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover p-6 group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80";
                    }}
                  />
                  
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {product.badge}
                    </div>
                  </div>

                  {product.polarized && (
                    <div className="absolute top-14 left-4">
                      <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        Polarized
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 w-11 h-11 bg-white/95 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
                  >
                    <Heart
                      size={20}
                      className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-700"}
                    />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition-all flex items-center gap-2 shadow-xl transform translate-y-6 group-hover:translate-y-0"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
                      <Star className="text-amber-500 fill-amber-500" size={14} />
                      <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                      </div>
                      <div className="text-xs text-green-600 font-semibold">
                        Save ₹{product.originalPrice - product.price}
                      </div>
                    </div>
                    <button className="text-amber-600 hover:text-amber-700 font-bold text-sm flex items-center gap-1">
                      View
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl">
              <Sun size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No sunglasses found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more options</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedPriceRange("all");
                  setSearchQuery("");
                }}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold hover:from-amber-600 hover:to-orange-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sun size={64} className="mx-auto mb-6" />
          <h2 className="text-5xl font-bold mb-6">Step Into the Sunshine</h2>
          <p className="text-2xl mb-10 text-amber-100">
            Find your perfect pair today and enjoy free shipping, hassle-free returns, and premium quality guaranteed.
          </p>
          <button className="bg-white text-amber-600 px-12 py-5 rounded-full font-bold text-xl hover:bg-amber-50 transition-all shadow-2xl">
            Shop Now
          </button>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => {
          setShowAuthModal(false);
        }}
      />
    </div>
  );
}