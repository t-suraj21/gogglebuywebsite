import { useState } from "react";
import { Eye, Droplet, Shield, Clock, Star, ShoppingCart, Heart, Award, Truck, RefreshCw, Search, Sparkles, ChevronRight, Zap, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import AuthModal from "../components/AuthModal";
import MobileAddToCartButton from "../components/MobileAddToCartButton";

export default function ContactLenses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const contactLenses = [
    {
      id: 1,
      name: "Daily Comfort Plus",
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviews: 245,
      badge: "Best Seller",
      category: "daily",
      packSize: "30 lenses",
      features: ["Daily Disposable", "UV Protection", "Moisture Lock"],
      image: "/Image/8.jpeg",
      description: "Ultimate comfort for all-day wear with advanced moisture technology"
    },
    {
      id: 2,
      name: "Monthly Vision Clear",
      price: 899,
      originalPrice: 1199,
      rating: 4.6,
      reviews: 189,
      badge: "30% OFF",
      category: "monthly",
      packSize: "6 lenses",
      features: ["Monthly Wear", "Clear Vision", "Breathable Material"],
      image: "/Image/34.jpeg",
      description: "Crystal clear vision with extended wear comfort"
    },
    {
      id: 3,
      name: "Color Enhancement Blue",
      price: 1599,
      originalPrice: 1999,
      rating: 4.9,
      reviews: 312,
      badge: "Color Special",
      category: "colored",
      packSize: "2 lenses",
      features: ["Natural Enhancement", "UV Protection", "Long Lasting"],
      image: "/Image/15.jpeg",
      description: "Enhance your natural eye color with subtle, beautiful tints"
    },
    {
      id: 4,
      name: "Toric Astigmatism Pro",
      price: 1899,
      originalPrice: 2299,
      rating: 4.7,
      reviews: 156,
      badge: "Astigmatism",
      category: "toric",
      packSize: "6 lenses",
      features: ["Astigmatism Correction", "Stable Fit", "Clear Vision"],
      image: "/Image/9.jpeg",
      description: "Advanced correction for astigmatism with superior comfort"
    },
    {
      id: 5,
      name: "Multifocal Progressive",
      price: 2199,
      originalPrice: 2699,
      rating: 4.5,
      reviews: 98,
      badge: "Presbyopia",
      category: "multifocal",
      packSize: "6 lenses",
      features: ["Near & Far Vision", "Smooth Transition", "Premium Comfort"],
      image: "/Image/37.jpeg",
      description: "Seamless vision correction for presbyopia and bifocal needs"
    },
    {
      id: 6,
      name: "Silicone Hydrogel Plus",
      price: 1399,
      originalPrice: 1699,
      rating: 4.4,
      reviews: 203,
      badge: "Extended Wear",
      category: "silicone",
      packSize: "6 lenses",
      features: ["Extended Wear", "High Oxygen", "All-Day Comfort"],
      image: "/Image/24.jpeg",
      description: "Advanced silicone hydrogel for maximum breathability"
    },
    {
      id: 7,
      name: "Kids Soft Lenses",
      price: 999,
      originalPrice: 1299,
      rating: 4.6,
      reviews: 87,
      badge: "Kids Safe",
      category: "kids",
      packSize: "30 lenses",
      features: ["Child-Friendly", "Easy Handling", "Gentle Material"],
      image: "/Image/3.jpeg",
      description: "Specifically designed for children with gentle, comfortable wear"
    },
    {
      id: 8,
      name: "Sport Performance Pro",
      price: 1699,
      originalPrice: 2099,
      rating: 4.8,
      reviews: 176,
      badge: "Athletes",
      category: "sport",
      packSize: "6 lenses",
      features: ["Impact Resistant", "Anti-Fog", "UV Protection"],
      image: "/Image/30.jpeg",
      description: "High-performance lenses designed for active lifestyles"
    },
    {
      id: 9,
      name: "Color Hazel Natural",
      price: 1799,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 198,
      badge: "Popular",
      category: "colored",
      packSize: "2 lenses",
      features: ["Natural Look", "Comfortable", "UV Block"],
      image: "/Image/18.jpeg",
      description: "Beautiful hazel tones for a natural, enhanced look"
    },
    {
      id: 10,
      name: "Daily Disposable Comfort",
      price: 1099,
      originalPrice: 1399,
      rating: 4.9,
      reviews: 289,
      badge: "New",
      category: "daily",
      packSize: "30 lenses",
      features: ["Daily Use", "No Cleaning", "Fresh Daily"],
      image: "/Image/39.jpeg",
      description: "Fresh, clean lenses every day for optimal eye health"
    },
    {
      id: 11,
      name: "Monthly Extended Wear",
      price: 799,
      originalPrice: 1099,
      rating: 4.5,
      reviews: 156,
      badge: "Value",
      category: "monthly",
      packSize: "6 lenses",
      features: ["Cost Effective", "Breathable", "Comfortable"],
      image: "/Image/20.jpeg",
      description: "Affordable monthly lenses without compromising quality"
    },
    {
      id: 12,
      name: "Toric Daily Disposable",
      price: 1999,
      originalPrice: 2499,
      rating: 4.8,
      reviews: 134,
      badge: "Premium",
      category: "toric",
      packSize: "30 lenses",
      features: ["Astigmatism", "Daily Fresh", "Stable Vision"],
      image: "/Image/16.jpeg",
      description: "Daily disposable convenience for astigmatism correction"
    }
  ];

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = contactLenses.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const searchMatch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 w-full">
      {/* Hero Section with Model */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1920&q=80"
            alt="Contact Lenses Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/80 via-teal-900/70 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full mb-6 backdrop-blur-md border border-white/30">
              <Sparkles className="text-cyan-300" size={20} />
              <span className="text-white font-semibold text-sm">Premium Vision Care</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-6 leading-none">
              Contact
              <span className="block bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Lenses
              </span>
            </h1>
            
            <p className="text-2xl text-cyan-100 mb-8 leading-relaxed">
              Experience freedom from glasses with our premium contact lenses. Crystal clear vision, all-day comfort, and advanced moisture technology for healthy eyes.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-cyan-600 hover:to-teal-700 transition-all flex items-center gap-3 shadow-2xl">
                <ShoppingCart size={24} />
                Shop Collection
              </button>
              <button className="bg-white/20 backdrop-blur-md border-2 border-white/50 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all">
                Prescription Guide
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">UV400</div>
                <div className="text-sm text-cyan-200">Protection</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">12+</div>
                <div className="text-sm text-cyan-200">Lens Types</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">4.7★</div>
                <div className="text-sm text-cyan-200">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="text-white rotate-90" size={36} />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-600 py-10 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield size={36} />
              <div className="font-bold text-lg">UV Protection</div>
              <div className="text-sm text-cyan-100">Complete UV400</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck size={36} />
              <div className="font-bold text-lg">Free Shipping</div>
              <div className="text-sm text-cyan-100">Orders above ₹999</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RefreshCw size={36} />
              <div className="font-bold text-lg">Easy Returns</div>
              <div className="text-sm text-cyan-100">30-day policy</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award size={36} />
              <div className="font-bold text-lg">Certified Safe</div>
              <div className="text-sm text-cyan-100">FDA approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
              <Zap size={16} />
              Why Choose Contact Lenses
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">See Life More Clearly</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern contact lens technology provides superior comfort, vision correction, and protection for your eyes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Crystal Clear Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced optics provide sharp, natural vision correction without frames obstructing your view.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Droplet className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">All-Day Comfort</h3>
              <p className="text-gray-600 leading-relaxed">
                Moisture-rich materials and breathable design keep your eyes comfortable from morning to night.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">UV Protection</h3>
              <p className="text-gray-600 leading-relaxed">
                Built-in UV400 protection shields your eyes from harmful ultraviolet rays throughout the day.
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Flexible Options</h3>
              <p className="text-gray-600 leading-relaxed">
                Daily, weekly, or monthly wear options to perfectly match your lifestyle and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Our Premium Collection</h2>
            <p className="text-xl text-gray-600">Find the perfect contact lenses for your eyes and lifestyle</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border-2 border-cyan-100">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Search contact lenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-lg"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium text-lg"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Lens Type</label>
              <div className="flex flex-wrap gap-3">
                {["all", "daily", "monthly", "colored", "toric", "multifocal", "silicone", "kids", "sport"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-8 flex items-center justify-between">
            <div className="text-lg text-gray-600">
              Showing <span className="font-bold text-gray-900">{sortedProducts.length}</span> contact lenses
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border-2 border-gray-100">
                <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-cyan-50 to-teal-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover p-6 group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
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
                      className="bg-white text-cyan-600 px-8 py-3 rounded-full font-bold hover:bg-cyan-50 transition-all flex items-center gap-2 shadow-xl transform translate-y-6 group-hover:translate-y-0"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">{product.category}</span>
                    <div className="flex items-center gap-1 bg-cyan-50 px-2.5 py-1 rounded-full">
                      <Star className="text-cyan-500 fill-cyan-500" size={14} />
                      <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl mb-4">
                    <div className="text-xs text-gray-600 mb-1">Pack Size</div>
                    <div className="font-bold text-gray-900">{product.packSize}</div>
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
                    <button className="text-cyan-600 hover:text-cyan-700 font-bold text-sm flex items-center gap-1">
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
              <Eye size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No lenses found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-full font-bold hover:from-cyan-600 hover:to-teal-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Care Guide */}
      <section className="py-20 bg-gradient-to-r from-cyan-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <AlertCircle size={48} className="mx-auto mb-4" />
            <h2 className="text-5xl font-bold mb-6">Proper Lens Care</h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Follow these essential steps to keep your contact lenses safe, comfortable, and your eyes healthy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Clean Hands", desc: "Always wash and dry hands before handling lenses" },
              { num: "2", title: "Follow Schedule", desc: "Replace lenses according to recommended wear time" },
              { num: "3", title: "Proper Storage", desc: "Store in fresh solution in a clean case daily" },
              { num: "4", title: "Regular Check-ups", desc: "Visit your eye doctor for routine examinations" }
            ].map((step) => (
              <div key={step.num} className="text-center bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-cyan-900">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-cyan-200">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Types of Contact Lenses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right contact lenses for your vision needs and lifestyle preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-10 rounded-3xl border-2 border-cyan-100">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Soft Contact Lenses</h3>
              <ul className="space-y-4 text-gray-700">
                {[
                  "Comfortable and easy to wear for beginners",
                  "Daily, weekly, and monthly replacement options",
                  "Suitable for most vision prescriptions",
                  "Available with UV protection features"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Droplet className="text-cyan-500 mt-1" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-10 rounded-3xl border-2 border-cyan-100">   
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={32} />
              </div>  
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Rigid Gas Permeable Lenses</h3>
              <ul className="space-y-4 text-gray-700">
                {[
                  "Durable lenses that provide sharp vision",
                  "Ideal for complex prescriptions and astigmatism",
                  "Allow more oxygen to reach the cornea",
                  "Longer lifespan with proper care"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Shield className="text-teal-500 mt-1" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
