import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Feather, TrendingUp, Zap, Award, Shield, Truck, RefreshCw, Search, Filter, ChevronDown, Sparkles, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import AuthModal from "../components/AuthModal";
import MobileAddToCartButton from "../components/MobileAddToCartButton";

export default function RimlessFrames() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      name: "Classic Rimless Titanium",
      price: 3499,
      rating: 4.9,
      reviews: 234,
      badge: "Bestseller",
      style: "classic",
      material: "titanium",
      image: "/Image/19.jpeg",
      description: "Ultra-lightweight titanium rimless frames with invisible elegance",
      features: ["Featherlight", "Scratch Resistant", "Premium Hinges"]
    },
    {
      id: 2,
      name: "Minimalist Silver Rimless",
      price: 2899,
      rating: 4.8,
      reviews: 189,
      badge: "Premium",
      style: "minimalist",
      material: "stainless steel",
      image: "/Image/22.jpeg",
      description: "Sleek silver rimless design for the modern professional",
      features: ["Lightweight", "Durable", "Anti-Glare"]
    },
    {
      id: 3,
      name: "Lightweight Gold Rimless",
      price: 3799,
      rating: 4.7,
      reviews: 156,
      badge: "Luxury",
      style: "elegant",
      material: "gold-plated",
      image: "/Image/25.jpeg",
      description: "Sophisticated gold-plated rimless frames that make a statement",
      features: ["Luxury Finish", "Comfortable", "Hypoallergenic"]
    },
    {
      id: 4,
      name: "Modern Transparent Rimless",
      price: 2699,
      rating: 4.6,
      reviews: 178,
      badge: "Trending",
      style: "modern",
      material: "crystal clear",
      image: "/Image/22.jpeg",
      description: "Crystal clear rimless frames for an invisible look",
      features: ["Nearly Invisible", "Lightweight", "UV Protection"]
    },
    {
      id: 5,
      name: "Business Professional Rimless",
      price: 3299,
      rating: 4.9,
      reviews: 267,
      badge: "Professional",
      style: "business",
      material: "titanium",
      image: "/Image/38.jpeg",
      description: "Executive rimless frames designed for the boardroom",
      features: ["Professional Look", "Durable", "Adjustable"]
    },
    {
      id: 6,
      name: "Sport Active Rimless",
      price: 2999,
      rating: 4.8,
      reviews: 145,
      badge: "Sport",
      style: "sport",
      material: "flexible titanium",
      image: "/Image/30.jpeg",
      description: "Flexible rimless frames perfect for active lifestyles",
      features: ["Flexible", "Impact Resistant", "Secure Fit"]
    },
    {
      id: 7,
      name: "Designer Fashion Rimless",
      price: 4199,
      rating: 4.7,
      reviews: 198,
      badge: "Designer",
      style: "fashion",
      material: "premium titanium",
      image: "/Image/29.jpeg",
      description: "High-fashion rimless frames with designer aesthetics",
      features: ["Designer Quality", "Unique Style", "Premium"]
    },
    {
      id: 8,
      name: "Comfort Plus Rimless",
      price: 2799,
      rating: 4.9,
      reviews: 312,
      badge: "Comfort",
      style: "comfort",
      material: "memory titanium",
      image: "/Image/27.jpeg",
      description: "Maximum comfort rimless frames for all-day wear",
      features: ["Memory Fit", "Ultra Soft", "All-Day Comfort"]
    },
    {
      id: 9,
      name: "Vintage Round Rimless",
      price: 3199,
      rating: 4.6,
      reviews: 134,
      badge: "Vintage",
      style: "vintage",
      material: "classic steel",
      image: "/Image/31.jpeg",
      description: "Retro-inspired round rimless frames with timeless appeal",
      features: ["Vintage Style", "Durable", "Classic Look"]
    },
    {
      id: 10,
      name: "Aviation Rimless Pro",
      price: 3599,
      rating: 4.8,
      reviews: 221,
      badge: "Aviation",
      style: "aviator",
      material: "aerospace titanium",
      image: "/Image/1.jpeg",
      description: "Aviation-inspired rimless frames with technical precision",
      features: ["Pilot Style", "Premium Build", "Wind Resistant"]
    },
    {
      id: 11,
      name: "Executive Rimless Elite",
      price: 4499,
      rating: 4.9,
      reviews: 289,
      badge: "Elite",
      style: "executive",
      material: "platinum finish",
      image: "/Image/32.jpeg",
      description: "Top-tier rimless frames for executives and professionals",
      features: ["Platinum Finish", "Exclusive", "Premium Quality"]
    },
    {
      id: 12,
      name: "Youth Sport Rimless",
      price: 2299,
      rating: 4.7,
      reviews: 167,
      badge: "Youth",
      style: "youth",
      material: "flexible polymer",
      image: "/Image/5.jpeg",
      description: "Rimless frames designed for young active individuals",
      features: ["Youth Fit", "Durable", "Flexible"]
    }
  ];

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter(product => {
    const styleMatch = selectedStyle === "all" || product.style === selectedStyle;
    const materialMatch = selectedMaterial === "all" || product.material.includes(selectedMaterial);
    const searchMatch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let priceMatch = true;
    if (selectedPriceRange === "under3000") priceMatch = product.price < 3000;
    else if (selectedPriceRange === "3000-4000") priceMatch = product.price >= 3000 && product.price <= 4000;
    else if (selectedPriceRange === "above4000") priceMatch = product.price > 4000;
    
    return styleMatch && materialMatch && priceMatch && searchMatch;
  });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.2),transparent_50%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                <Sparkles size={18} />
                <span className="text-sm font-medium">Premium Collection</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Rimless
                <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Frames</span>
              </h1>
              
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Experience the ultimate in minimalist eyewear. Our rimless frames combine invisible elegance with exceptional comfort, perfect for those who appreciate understated sophistication.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center gap-2 shadow-lg">
                  <ShoppingCart size={20} />
                  Explore Collection
                </button>
                <button className="border-2 border-white/50 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition backdrop-blur-sm">
                  Virtual Try-On
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">12+</div>
                  <div className="text-sm text-blue-200">Premium Styles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">4.8</div>
                  <div className="text-sm text-blue-200">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">2.5K+</div>
                  <div className="text-sm text-blue-200">Happy Customers</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <Feather className="mb-3" size={32} />
                    <div className="text-sm text-blue-200">Ultra-Light</div>
                    <div className="text-2xl font-bold">3-5g</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <Shield className="mb-3" size={32} />
                    <div className="text-sm text-blue-200">Warranty</div>
                    <div className="text-2xl font-bold">2 Years</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <Award className="mb-3" size={32} />
                    <div className="text-sm text-blue-200">Materials</div>
                    <div className="text-2xl font-bold">Premium</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <Users className="mb-3" size={32} />
                    <div className="text-sm text-blue-200">Customers</div>
                    <div className="text-2xl font-bold">2500+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-10 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
          <div className="relative max-w-7xl mx-auto px-4 container mx-auto px-2 sm:px-4 md:px-8">
                <Shield className="text-blue-600" size={28} />
              </div>
              <div className="font-bold text-gray-900">2 Year Warranty</div>
              <div className="text-sm text-gray-600">Full coverage included</div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="text-blue-600" size={28} />
              </div>
              <div className="font-bold text-gray-900">Free Shipping</div>
              <div className="text-sm text-gray-600">On orders above ₹2499</div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCw className="text-blue-600" size={28} />
              </div>
              <div className="font-bold text-gray-900">45-Day Returns</div>
              <div className="text-sm text-gray-600">No questions asked</div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="text-blue-600" size={28} />
              </div>
              <div className="font-bold text-gray-900">Premium Quality</div>
              <div className="text-sm text-gray-600">100% Authentic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rimless Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
              <Sparkles size={16} />
              Why Choose Rimless
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">The Invisible Advantage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rimless frames offer unparalleled benefits that make them the choice of discerning eyewear enthusiasts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <Feather className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Featherlight Design</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Weighing as little as 3-5 grams, rimless frames are virtually weightless. You'll forget you're even wearing glasses, making them perfect for all-day comfort.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  No pressure points
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  All-day comfort
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Perfect for active lifestyles
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unobstructed Vision</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                With no frame borders to limit your field of view, rimless glasses provide maximum visibility. See the world without boundaries.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  360° clear vision
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  No frame distractions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  Enhanced peripheral view
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Timeless Elegance</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                The minimalist aesthetic of rimless frames never goes out of style. Subtle sophistication that complements any look or occasion.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Professional appearance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Versatile styling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Understated luxury
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Premium Collection</h2>
            <p className="text-xl text-gray-600">Discover the perfect rimless frames crafted with precision and care</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-lg p-6 mb-10 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for your perfect rimless frames..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Styles</option>
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="business">Business</option>
                  <option value="sport">Sport</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Material</label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Materials</option>
                  <option value="titanium">Titanium</option>
                  <option value="steel">Stainless Steel</option>
                  <option value="gold">Gold-Plated</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price Range</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Prices</option>
                  <option value="under3000">Under ₹3000</option>
                  <option value="3000-4000">₹3000 - ₹4000</option>
                  <option value="above4000">Above ₹4000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8 flex items-center justify-between">
            <div className="text-lg text-gray-600">
              Showing <span className="font-bold text-gray-900">{sortedProducts.length}</span> premium frames
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100">
                <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-gray-50 to-blue-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80";
                    }}
                  />
                  
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {product.badge}
                    </div>
                  </div>

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
                      className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-xl transform translate-y-6 group-hover:translate-y-0"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{product.style}</span>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="text-yellow-500 fill-yellow-500" size={14} />
                      <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</div>
                </div>
              </div>
            ))}   
          </div>
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