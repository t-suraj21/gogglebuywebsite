import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Feather, TrendingUp, Zap, Award, Shield, Truck, RefreshCw, Search, Filter, ChevronDown } from "lucide-react";

export default function HalfRimFrames() {
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const halfRimFrames = [
    {
      id: 1,
      name: "Titanium Half Rim Classic",
      price: 2899,
      rating: 4.8,
      reviews: 156,
      badge: "Premium",
      style: "classic",
      material: "titanium",
      gender: "unisex",
      frameColor: "Gunmetal",
      features: ["Ultra-Lightweight", "Flexible", "Hypoallergenic"],
      image: "/Image/26.jpeg",
    },
    {
      id: 2,
      name: "Acetate Modern Half Rim",
      price: 1999,
      rating: 4.6,
      reviews: 203,
      badge: "Trending",
      style: "modern",
      material: "acetate",
      gender: "women",
      frameColor: "Tortoise",
      features: ["Rich Colors", "Comfortable", "Stylish"],
      image: "/Image/21.jpeg",
      description: "Contemporary acetate half-rim frames in beautiful tortoise patterns"
    },
    {
      id: 3,
      name: "Steel Vintage Half Rim",
      price: 1599,
      rating: 4.7,
      reviews: 89,
      badge: "Classic",
      style: "vintage",
      material: "steel",
      gender: "men",
      frameColor: "Gold",
      features: ["Classic Look", "Durable", "Timeless"],
      image: "/Image/20.jpeg",
      description: "Vintage-inspired steel half-rim frames with gold accents"
    },
    {
      id: 4,
      name: "TR-90 Sport Half Rim",
      price: 2299,
      rating: 4.9,
      reviews: 134,
      badge: "Sport",
      style: "sport",
      material: "tr90",
      gender: "unisex",
      frameColor: "Black",
      features: ["Flexible", "Lightweight", "Impact Resistant"],
      image: "/Image/30.jpeg",
      description: "High-performance TR-90 half-rim frames perfect for active lifestyles"
    },
    {
      id: 5,
      name: "Wooden Artisan Half Rim",
      price: 3499,
      rating: 4.5,
      reviews: 67,
      badge: "Eco",
      style: "artisan",
      material: "wood",
      gender: "unisex",
      frameColor: "Walnut",
      features: ["Unique Grain", "Eco-Friendly", "Handcrafted"],
      image: "/Image/33.jpeg",
      description: "Handcrafted wooden half-rim frames with natural wood grain patterns"
    },
    {
      id: 6,
      name: "Carbon Fiber Tech Half Rim",
      price: 3199,
      rating: 4.8,
      reviews: 112,
      badge: "Tech",
      style: "tech",
      material: "carbon",
      gender: "men",
      frameColor: "Carbon Black",
      features: ["High-Tech", "Ultra-Light", "Aerospace Grade"],
      image: "/Image/28.jpeg",
      description: "Advanced carbon fiber half-rim frames with aerospace technology"
    },
    {
      id: 7,
      name: "Bamboo Eco Half Rim",
      price: 2499,
      rating: 4.4,
      reviews: 78,
      badge: "Sustainable",
      style: "eco",
      material: "bamboo",
      gender: "unisex",
      frameColor: "Natural Bamboo",
      features: ["Sustainable", "Renewable", "Lightweight"],
      image: "/Image/33.jpeg",
      description: "Sustainable bamboo half-rim frames made from renewable materials"
    },
    {
      id: 8,
      name: "Monel Classic Half Rim",
      price: 2799,
      rating: 4.6,
      reviews: 145,
      badge: "Comfort",
      style: "classic",
      material: "monel",
      gender: "women",
      frameColor: "Silver",
      features: ["Nickel-Free", "Hypoallergenic", "Flexible"],
      image: "/Image/22.jpeg",
      description: "Classic monel half-rim frames that are gentle on sensitive skin"
    },
    {
      id: 9,
      name: "Youth Sport Half Rim",
      price: 1799,
      rating: 4.7,
      reviews: 95,
      badge: "Kids",
      style: "sport",
      material: "tr90",
      gender: "kids",
      frameColor: "Blue",
      features: ["Durable", "Safe", "Adjustable"],
      image: "/Image/5.jpeg",
      description: "Specially designed half-rim frames for active youngsters"
    },
    {
      id: 10,
      name: "Executive Business Half Rim",
      price: 3299,
      rating: 4.9,
      reviews: 178,
      badge: "Professional",
      style: "classic",
      material: "titanium",
      gender: "men",
      frameColor: "Gunmetal Grey",
      features: ["Professional", "Lightweight", "Premium"],
      image: "/Image/38.jpeg",
      description: "Sophisticated titanium frames perfect for the modern professional"
    },
    {
      id: 11,
      name: "Fashion Forward Half Rim",
      price: 2199,
      rating: 4.5,
      reviews: 124,
      badge: "Trendy",
      style: "modern",
      material: "acetate",
      gender: "women",
      frameColor: "Rose Gold",
      features: ["Stylish", "Lightweight", "Comfortable"],
      image: "/Image/25.jpeg",
      description: "Fashion-forward designs that make a statement"
    },
    {
      id: 12,
      name: "Senior Comfort Half Rim",
      price: 2599,
      rating: 4.8,
      reviews: 156,
      badge: "Comfort+",
      style: "classic",
      material: "monel",
      gender: "unisex",
      frameColor: "Brown",
      features: ["Extra Comfort", "Easy Adjust", "Lightweight"],
      image: "/Image/12.jpeg",
      description: "Designed with extra comfort features for all-day wear"
    }
  ];

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = halfRimFrames.filter(product => {
    const styleMatch = selectedStyle === "all" || product.style === selectedStyle;
    const materialMatch = selectedMaterial === "all" || product.material === selectedMaterial;
    const genderMatch = selectedGender === "all" || product.gender === selectedGender || product.gender === "unisex";
    const searchMatch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let priceMatch = true;
    if (selectedPriceRange === "under2000") priceMatch = product.price < 2000;
    else if (selectedPriceRange === "2000-3000") priceMatch = product.price >= 2000 && product.price <= 3000;
    else if (selectedPriceRange === "above3000") priceMatch = product.price > 3000;
    
    return styleMatch && materialMatch && priceMatch && genderMatch && searchMatch;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <Award size={20} />
                <span className="text-sm font-medium">Premium Eyewear Collection</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Half Rim Frames
                <span className="block text-blue-200">For Every Age</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Discover the perfect balance of style, comfort, and functionality. Our curated collection features frames designed for everyone from kids to seniors, professionals to athletes.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition flex items-center gap-2">
                  <ShoppingCart size={20} />
                  Shop Now
                </button>
                <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition">
                  Virtual Try-On
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-bold mb-2">12+</div>
                <div className="text-blue-100">Frame Styles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-bold mb-2">8+</div>
                <div className="text-blue-100">Materials</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-bold mb-2">4.7</div>
                <div className="text-blue-100">Avg Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="text-4xl font-bold mb-2">1K+</div>
                <div className="text-blue-100">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield className="text-blue-600" size={32} />
              <div className="font-semibold text-gray-900">1 Year Warranty</div>
              <div className="text-sm text-gray-600">All frames covered</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="text-blue-600" size={32} />
              <div className="font-semibold text-gray-900">Free Shipping</div>
              <div className="text-sm text-gray-600">On orders above ₹1999</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="text-blue-600" size={32} />
              <div className="font-semibold text-gray-900">30-Day Returns</div>
              <div className="text-sm text-gray-600">Hassle-free returns</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="text-blue-600" size={32} />
              <div className="font-semibold text-gray-900">Premium Quality</div>
              <div className="text-sm text-gray-600">Certified materials</div>
            </div>
          </div>
        </div>
      </section>

      {/* Age Group Guide */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frames For Every Generation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe everyone deserves the perfect pair of glasses. That's why our collection spans all ages and lifestyles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">👶</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kids (5-12)</h3>
              <p className="text-gray-600 mb-4">Durable, flexible frames designed for active play. Impact-resistant materials ensure safety during adventures.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• TR-90 flexible material</li>
                <li>• Adjustable nose pads</li>
                <li>• Fun colors available</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Teens (13-19)</h3>
              <p className="text-gray-600 mb-4">Trendy styles that express personality. Lightweight designs perfect for school and sports activities.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Modern trendy designs</li>
                <li>• Lightweight comfort</li>
                <li>• Anti-blue light options</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Adults (20-60)</h3>
              <p className="text-gray-600 mb-4">Professional and casual styles for work and life. Premium materials for all-day comfort and durability.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Professional aesthetics</li>
                <li>• Premium materials</li>
                <li>• Versatile styles</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seniors (60+)</h3>
              <p className="text-gray-600 mb-4">Extra comfort features with easy adjustments. Lightweight designs that won't cause pressure points.</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Ultra-lightweight</li>
                <li>• Easy adjustments</li>
                <li>• Maximum comfort</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Collection</h2>
            <p className="text-lg text-gray-600">Find your perfect half-rim frames from our premium selection</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search frames by name or style..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                <Filter size={20} />
                Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Filters */}
            <div className={`mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Styles</option>
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="vintage">Vintage</option>
                  <option value="sport">Sport</option>
                  <option value="artisan">Artisan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Materials</option>
                  <option value="titanium">Titanium</option>
                  <option value="acetate">Acetate</option>
                  <option value="steel">Steel</option>
                  <option value="tr90">TR-90</option>
                  <option value="wood">Wood</option>
                  <option value="carbon">Carbon Fiber</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">For</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Everyone</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="under2000">Under ₹2000</option>
                  <option value="2000-3000">₹2000 - ₹3000</option>
                  <option value="above3000">Above ₹3000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Showing <span className="font-semibold text-gray-900">{sortedProducts.length}</span> frames
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.badge}
                  </div>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
                  >
                    <Heart
                      size={18}
                      className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-700"}
                    />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{product.gender}</span>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="text-sm font-semibold">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">₹{product.price}</div>
                      <div className="text-xs text-gray-500">{product.material} • {product.frameColor}</div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                      View
                      <ChevronDown size={16} className="rotate-[-90deg]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl">
              <Eye size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No frames found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more options</p>
              <button
                onClick={() => {
                  setSelectedStyle("all");
                  setSelectedMaterial("all");
                  setSelectedPriceRange("all");
                  setSelectedGender("all");
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Why Half Rim Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Half Rim Frames?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Half-rim frames offer unique advantages that make them a popular choice across all age groups
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Feather size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Ultra Lightweight</h3>
              <p className="text-sm text-gray-600">Minimal frame weight for maximum comfort during all-day wear without pressure points</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <TrendingUp size={28} className="text-blue-600" />
              </div>  
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Stylish Designs</h3>
              <p className="text-sm text-gray-600">Sleek and modern aesthetics that complement any look, from casual to professional</p>
            </div>  
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Zap size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Enhanced Durability</h3>
              <p className="text-sm text-gray-600">Robust construction that withstands daily wear and tear, ideal for active lifestyles</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Versatile Fit</h3>
              <p className="text-sm text-gray-600">Adaptable designs that suit various face shapes and sizes, ensuring a comfortable fit for everyone</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
  