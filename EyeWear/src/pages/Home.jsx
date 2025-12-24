import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AdminMenuWrapper from "../components/AdminMenuWrapper";
import ProductCard from "../components/ProductCard";
import AuthModal from "../components/AuthModal";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
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

  // Use real goggle products
  const featuredProducts = gogglesProducts.slice(0, 12);

  const latestProducts = gogglesProducts.slice(12, 15);

  const popularProducts = gogglesProducts.slice(15, 23);

  const categories = [
    { name: "Men Wear ", image: "/Image/32.jpeg" },
    { name: "Female Wear ", image: "/Image/5.jpeg" },
    { name: "Child Wear", image: "/Image/28.jpeg" }
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
    // Refresh page to show logout changes
    setTimeout(() => {
      window.location.href = "/home";
    }, 300);
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
    if (!user) {
      setPendingNavigation(path);
      setShowAuthModal(true);
    } else {
      navigate(path);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <FiHome size={28} className="text-blue-600" />
              <span className="text-blue-600">BUYCHASHME</span>
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
                  className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileDropdown(!isProfileDropdown)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full hover:bg-blue-100 transition"
                    >
                      <FiUser size={20} className="text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">{user.name?.split(" ")[0]}</span>
                    </button>
                    {isProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                        <a href="#profile" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition">
                          <FiUser className="inline mr-2" size={16} />
                          My Profile
                        </a>
                        <a href="#orders" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 transition">
                          <FiShoppingCart className="inline mr-2" size={16} />
                          My Orders
                        </a>
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
                  <button onClick={() => navigate("/login")} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
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
    <div className="flex flex-wrap items-center justify-center gap-6 py-3 text-sm font-semibold text-gray-800">

      <button
        onClick={() => handleShopClick("/deals")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Today Deals
      </button>

      <button
        onClick={() => handleShopClick("/eyeglasses")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Eyeglasses
      </button>

      <button
        onClick={() => handleShopClick("/computer-glasses")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Computer Glasses
      </button>

      <button
        onClick={() => handleShopClick("/kids-glasses")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Kids Glasses
      </button>

      <button
        onClick={() => handleShopClick("/half-rim-frames")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Half Rim Frames
      </button>

      <button
        onClick={() => handleShopClick("/rimless-frames")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Rimless Frames
      </button>

      <button
        onClick={() => handleShopClick("/sunglasses")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Sunglasses
      </button>

      <button
        onClick={() => handleShopClick("/contact-lenses")}
        className="relative px-2 py-1 transition-all duration-200 hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
      >
        Contact Lenses
      </button>

    </div>
  </div>
</section>



      {/* Hero Slider */}
      <section className="relative h-[500px] overflow-hidden">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg}`}>
              <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                  <div className="text-white space-y-6">
                    <p className="text-lg font-medium">{slide.title}</p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                      {slide.discount}
                      <br />
                      <span className="text-white">{slide.subtitle}</span>
                    </h1>
                    <button onClick={() => handleShopClick("/sunglasses")} className="px-8 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition">
                      SHOP NOW
                    </button>
                  </div>
                  <div className="hidden lg:block">
                    <img
                      src={slide.image}
                      alt="Sunglasses"
                      className="w-full h-96 object-cover rounded-lg shadow-2xl"
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">FEATURED PRODUCTS</h2>
            <p className="text-gray-600">Discover our premium selection of eyewear</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Discover Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-2">DISCOVER OUR SELECTION</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <h3 className="text-black text-2xl font-bold  text-gray-900 inline-block px-8 py-2">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Collection */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <p className="text-sm text-gray-600 font-semibold">LATEST</p>
              <h2 className="text-3xl font-bold text-gray-900">PREMIUM COLLECTION</h2>
              <p className="text-gray-600">
                Explore our carefully curated selection of premium eyewear with the latest designs and technologies.
              </p>
              <button onClick={() => navigate("/products")} className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
                VIEW ALL
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
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">MOST POPULAR EYEWEAR</h2>
            <p className="text-gray-600">Handpicked favorites from our collection</p>
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
      <section className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-400 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 z-10 relative">
              <p className="text-gray-800 text-sm font-semibold tracking-wider uppercase">New Collection 2025</p>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight drop-shadow-lg">
                BRANDS
                <br />
                YOU LOVE
              </h2>
              <p className="text-gray-800 text-lg max-w-lg leading-relaxed">
                Discover stylish eyewear collections from the world's most desirable brands. Stand out and stay protected with our authentic designer shades.
              </p>
              <button className="px-8 py-4 bg-white text-gray-900 font-bold text-sm tracking-wide rounded-md hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                SHOP NOW
              </button>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80"
                  alt="Fashion Model with Sunglasses"
                  className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                />
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full opacity-20"></div>
              </div>
              
              {/* Navigation Arrows */}
              <button className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110">
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Background Decorative Circles */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500 rounded-full opacity-20 blur-3xl"></div>
      </section>
      
      {/* Newsletter */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Let's Stay Connected!</h2>
            <form onSubmit={handleNewsletter} className="flex gap-4">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FiTruck size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders above ₹500</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FiShield size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% protected checkout</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FiArrowRight size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">7 days return policy</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FiStar size={28} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Top Quality</h3>
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
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingNavigation(null);
        }}
        onLoginSuccess={handleAuthSuccess}
      />
    </div>
    );
}      