import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminMenuWrapper from "../components/AdminMenuWrapper";
import ProductCard from "../components/ProductCard";
import MobileAddToCartButton from "../components/MobileAddToCartButton";
import { gogglesProducts } from "../data/products";
import { logout } from "../redux/authSlice";

import { FiArrowRight, FiShoppingCart, FiTruck, FiShield, FiStar, FiMenu, FiX, FiSearch, FiUser, FiLogOut, FiHome, FiChevronLeft, FiChevronRight } from "react-icons/fi";


export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [isWearDropdown, setIsWearDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const cartItems = useSelector((state) => state.cart.items || []);
  const cartCount = cartItems.length;
  const user = useSelector((state) => state.auth.user);

  // Hero slides with goggle products
  const heroSlides = [
    {
      title: "Get your brand new shades with",
      discount: "UP TO 40% OFF",
      subtitle: "PREMIUM COLLECTION",
      image: "/Image/32.jpeg",
      bg: "from-blue-900 to-blue-800"
    },
    {
      title: "Luxury Designer Frames",
      discount: "NEW ARRIVALS 2025",
      subtitle: "EXCLUSIVE STYLES",
      image: "/Image/26.jpeg",
      bg: "from-purple-900 to-purple-800"
    },
    {
      title: "Photochromic & Smart Tech",
      discount: "30% OFF FEATURED",
      subtitle: "SMART EYEWEAR",
      image: "/Image/28.jpeg",
      bg: "from-indigo-900 to-indigo-800"
    }
  ];

  const DropdownItem = ({ label, path }) => {
  return (
    <button
      onClick={() => handleShopClick(path)}
      className="text-left px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition"
    >
      {label}
    </button>
  );
};

  // Use real goggle products
  const featuredProducts = gogglesProducts.slice(0, 12);

  const latestProducts = gogglesProducts.slice(12, 15);

  const popularProducts = gogglesProducts.slice(15, 23);

  const categories = [
    { name: "Men Wear", image: "/Image/32.jpeg", path: "/male-wear" },
    { name: "Female Wear", image: "/Image/5.jpeg", path: "/female-wear" },
    { name: "Child Wear", image: "/Image/28.jpeg", path: "/child-wear" }
  ];

  const testimonials = [
    { text: "Cras ac ipsum eu elit nonummy malesuada. Ut non eros in arcu dignissim eleifend ultricies purus. Donec vehicula diam eget ex fermentum, id gravida quam pulvinar quisque vel dictum.", author: "ANGELA CARTER", role: "CEO & FOUNDER" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Update filtered products based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = gogglesProducts.filter((product) => 
        product.name.toLowerCase().includes(query) || 
        product.brand?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
      setFilteredProducts(results);
      setShowSearchResults(true);
    } else {
      setFilteredProducts([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      // Keep search results visible
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileDropdown(false);
    // Clear cart and other state
    localStorage.clear();
    // Store any other necessary items before clearing
    // Redirect to home
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const handleShopClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white w-full">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg shadow-lg">
                <FiHome size={24} className="text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">BUYCHASHME</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {/* <div className="flex gap-6">
                <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
                <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">Products</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>
              </div> */}

              <form onSubmit={handleSearch} className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchResults(true)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg transition-all duration-300"
                />
                <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600 transition">
                  <FiSearch size={18} />
                </button>

                {/* Search Results Dropdown */}
                {showSearchResults && filteredProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {filteredProducts.slice(0, 5).map((product) => (
                      <div
                        key={product._id}
                        onClick={() => {
                          window.location.href = `/product/${product._id}`;
                          setSearchQuery("");
                          setShowSearchResults(false);
                        }}
                        className="px-4 py-3 border-b hover:bg-blue-50 cursor-pointer transition flex items-center gap-3"
                      >
                        <img src={product.images?.[0]} alt={product.name} className="w-10 h-10 object-cover rounded" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=40&q=80"} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                    ))}
                    {filteredProducts.length > 5 && (
                      <div className="px-4 py-2 text-center text-sm text-blue-600 hover:bg-blue-50 cursor-pointer">
                        View all {filteredProducts.length} results
                      </div>
                    )}
                  </div>
                )}
              </form>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleShopClick('/cart')}
                  className="relative text-gray-700 hover:text-blue-600 hover:scale-110 transition-all duration-300 cursor-pointer bg-none border-none p-2 hover:bg-blue-50 rounded-full"
                >
                  <FiShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>

                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileDropdown(!isProfileDropdown)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full hover:from-blue-100 hover:to-blue-200 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-1.5 rounded-full">
                        <FiUser size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{user.name?.split(" ")[0]}</span>
                    </button>
                    {isProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <Link to="/profile" onClick={() => setIsProfileDropdown(false)} className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition">
                          <FiUser className="inline mr-2" size={16} />
                          My Profile
                        </Link>
                        <Link to="/orders" onClick={() => setIsProfileDropdown(false)} className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition">
                          <FiShoppingCart className="inline mr-2" size={16} />
                          My Orders
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition font-medium"
                        >
                          <FiLogOut className="inline mr-2" size={16} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={() => navigate("/login")} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105">
                    Login
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-700">
                <FiSearch size={20} />
              </button>
              <button 
                onClick={() => handleShopClick('/cart')}
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

          {/* Mobile Search */}
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

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
              <Link to="/deals" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Today Deals</Link>
              <button onClick={() => handleShopClick("/eyeglasses")} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Eyeglasses</button>
              <button onClick={() => handleShopClick("/computer-glasses")} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Computer Glasses</button>
              <button onClick={() => handleShopClick("/kids-glasses")} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Kids Glasses</button>
              <button onClick={() => handleShopClick("/half-rim-frames")} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Half Rim Frames</button>
              <button onClick={() => handleShopClick("/rimless-frames")} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Rimless Frames</button>
              <button onClick={() => handleShopClick("/sunglasses")} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Sunglasses</button>
              <button onClick={() => handleShopClick("/contact-lenses")} className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">Contact Lenses</button>
              <hr className="my-2" />
              {user ? (
                <>
                  <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">My Profile</Link>
                  <Link to="/orders" className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded">My Orders</Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block px-3 py-2 bg-blue-600 text-white rounded font-medium text-center">
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
      {/* Admin Menu (shows only for admin) */}
      <AdminMenuWrapper />

        {/* ================= LINK BAR (IMAGE STYLE) ================= */}
  <section className="bg-white border-b shadow-sm hidden md:block">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex flex-wrap items-center justify-center gap-10 py-3 text-sm font-semibold text-gray-800">

      {/* MEN DROPDOWN */}
      <div className="relative group">
        <button className="relative px-2 py-1 hover:text-blue-600">
          Men
        </button>

        <div className="absolute left-0 top-full mt-2 w-52 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="flex flex-col p-3 gap-2 text-sm">
            <DropdownItem label="Eyeglasses" path="/eyeglasses" />
            <DropdownItem label="Computer Glasses" path="/computer-glasses" />
            <DropdownItem label="Half Rim Frames" path="/half-rim-frames" />
            <DropdownItem label="Rimless Frames" path="/rimless-frames" />
            <DropdownItem label="Sunglasses" path="/sunglasses" />
            <DropdownItem label="Contact Lenses" path="/contact-lenses" />
          </div>
        </div>
      </div>

      {/* WOMEN DROPDOWN */}
      <div className="relative group">
        <button className="relative px-2 py-1 hover:text-blue-600">
          Women
        </button>

        <div className="absolute left-0 top-full mt-2 w-52 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="flex flex-col p-3 gap-2 text-sm">
            <DropdownItem label="Eyeglasses" path="/eyeglasses" />
            <DropdownItem label="Computer Glasses" path="/computer-glasses" />
            <DropdownItem label="Rimless Frames" path="/rimless-frames" />
            <DropdownItem label="Sunglasses" path="/sunglasses" />
            <DropdownItem label="Contact Lenses" path="/contact-lenses" />
          </div>
        </div>
      </div>

      {/* KIDS DROPDOWN */}
      <div className="relative group">
        <button className="relative px-2 py-1 hover:text-blue-600">
          Kids
        </button>

        <div className="absolute left-0 top-full mt-2 w-52 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="flex flex-col p-3 gap-2 text-sm">
            <DropdownItem label="Kids Glasses" path="/kids-glasses" />
            <DropdownItem label="Computer Glasses" path="/computer-glasses" />
            <DropdownItem label="Sunglasses" path="/sunglasses" />
          </div>
        </div>
      </div>

      {/* TODAY DEALS (NORMAL LINK) */}
      <button
        onClick={() => handleShopClick("/deals")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Today Deals
      </button>

    </div>
  </div>
</section>




      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ${
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} before:absolute before:inset-0 before:bg-black/10`}>
              <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                  <div className="text-white space-y-8 animate-fadeIn">
                    <p className="text-lg font-semibold tracking-wider uppercase opacity-90">{slide.title}</p>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight drop-shadow-2xl">
                      {slide.discount}
                      <br />
                      <span className="text-white/95 text-4xl sm:text-5xl">{slide.subtitle}</span>
                    </h1>
                    <button onClick={() => handleShopClick("/sunglasses")} className="group px-10 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-full hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-red-500/50 hover:scale-105 flex items-center gap-2 w-fit">
                      SHOP NOW
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="hidden lg:block relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl blur-3xl"></div>
                    <img
                      src={slide.image}
                      alt="Sunglasses"
                      className="relative w-full h-[450px] object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 ring-4 ring-white/20"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-110 border border-white/20"
        >
          <FiChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-110 border border-white/20"
        >
          <FiChevronRight size={28} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === currentSlide ? "bg-white w-8 h-3" : "bg-white/50 w-3 h-3 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">✨ Featured Collection</span>
            <h2 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">FEATURED PRODUCTS</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our premium selection of eyewear crafted with precision and style</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Discover Categories */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 to-purple-50/30 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">🎯 Shop by Category</span>
            <h2 className="text-5xl font-black bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">DISCOVER OUR SELECTION</h2>
            <p className="text-lg text-gray-600">Find the perfect style for everyone</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => handleShopClick(cat.path)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl text-left transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-700"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                  <h3 className="text-white text-3xl font-black inline-block px-10 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-full group-hover:from-white/30 group-hover:to-white/20 transition-all duration-500 shadow-lg border border-white/20 group-hover:scale-110">
                    {cat.name}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Collection */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-8 flex flex-col justify-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold w-fit">🆕 Latest</span>
              <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">PREMIUM COLLECTION</h2>
              <p className="text-gray-600 leading-relaxed">
                Explore our carefully curated selection of premium eyewear with the latest designs and technologies.
              </p>
              <button onClick={() => navigate("/products")} className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2 w-fit">
                VIEW ALL
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Sunglasses */}
      <section id="products" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-semibold mb-4">🔥 Trending Now</span>
            <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-orange-900 bg-clip-text text-transparent mb-4">MOST POPULAR EYEWEAR</h2>
            <p className="text-lg text-gray-600">Handpicked favorites from our collection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>


      {/* Testimonial Section */}
      {/* Featured Brand Collection */}
      <section className="relative bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-400 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 z-10 relative animate-fadeIn">
              <span className="inline-block px-4 py-2 bg-white/30 backdrop-blur-md text-gray-900 rounded-full text-sm font-bold tracking-wider uppercase shadow-lg">New Collection 2025</span>
              <h2 className="text-6xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl">
                BRANDS
                <br />
                <span className="text-gray-900">YOU LOVE</span>
              </h2>
              <p className="text-gray-900 text-lg max-w-lg leading-relaxed font-medium">
                Discover stylish eyewear collections from the world's most desirable brands. Stand out and stay protected with our authentic designer shades.
              </p>
              <button className="group px-10 py-4 bg-white text-gray-900 font-bold text-sm tracking-wide rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-2xl hover:shadow-white/20 transform hover:scale-105 flex items-center gap-2 w-fit">
                SHOP NOW
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Image */}
            <div className="relative group">
              <div className="relative z-10">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-orange-300/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <img
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80"
                  alt="Fashion Model with Sunglasses"
                  className="relative w-full h-[520px] object-cover rounded-3xl shadow-2xl group-hover:shadow-white/30 transition-all duration-500 ring-4 ring-white/30 group-hover:scale-105"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-white rounded-full opacity-20 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-white rounded-full opacity-20 group-hover:scale-125 transition-transform duration-500"></div>
              </div>
              
              {/* Navigation Arrow */}
              <button className="absolute top-1/2 -translate-y-1/2 -right-6 bg-white text-gray-900 p-4 rounded-full shadow-2xl hover:shadow-white/40 transition-all duration-300 hover:scale-110 border-4 border-white/30">
                <FiChevronRight size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Background Decorative Circles */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500 rounded-full opacity-20 blur-3xl"></div>
      </section>
      
      {/* Newsletter */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">📧 Newsletter</span>
              <h2 className="text-4xl font-black bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-3">Let's Stay Connected!</h2>
              <p className="text-gray-600">Subscribe to get exclusive deals and latest updates</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                required
              />
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <FiTruck size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders above ₹500</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <FiShield size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% protected checkout</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <FiArrowRight size={32} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Easy Returns</h3>
              <p className="text-sm text-gray-600">7 days return policy</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <FiStar size={32} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Top Quality</h3>
              <p className="text-sm text-gray-600">Premium lenses & frames</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Goggle</h3>
              <p className="text-sm text-gray-400">
                Premium sunglasses for men, women & kids. Style meets protection.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/home" className="hover:text-white">Home</Link></li>
                <li><Link to="/products" className="hover:text-white">Products</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li>Men’s Sunglasses</li>
                <li>Women’s Sunglasses</li>
                <li>Kids Collection</li>
                <li>New Arrivals</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>FAQ</li>
                <li>Shipping</li>
                <li>Returns</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Goggle. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Auth Modal for Navigation */}
      {/* Mobile Add to Cart Button */}
      <MobileAddToCartButton />
    </div>
    );
}      