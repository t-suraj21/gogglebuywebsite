import { useState, useEffect } from "react";
import { FiClock, FiPercent, FiZap, FiTag, FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function Deals() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeLeft, setTimeLeft] = useState({});
  const dispatch = useDispatch();
  // Hero slides for the deals page
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      id: 1,
      title: "Biggest Deals of the Season!",
      subtitle: "FLASH SALE",
      description: "Save up to 50% on top eyewear brands. Limited time only!",
      buttonText: "Shop Now",
      image: "/Image/26.jpeg",
      bgColor: "from-red-700 to-yellow-500"
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free!",
      subtitle: "BOGO OFFER",
      description: "Exclusive BOGO deals on select frames and sunglasses.",
      buttonText: "Explore BOGO",
      image: "/Image/2.jpeg",
      bgColor: "from-orange-600 to-yellow-400"
    },
    {
      id: 3,
      title: "Kids Special Discounts!",
      subtitle: "KIDS COLLECTION",
      description: "Fun, safe, and stylish eyewear for kids at unbeatable prices.",
      buttonText: "Shop Kids",
      image: "/Image/3.jpeg",
      bgColor: "from-yellow-600 to-orange-400"
    }
  ];

  const deals = [
    {
      id: 1,
      name: "Premium Aviator Sunglasses",
      originalPrice: 3499,
      dealPrice: 1999,
      discount: 43,
      rating: 4.8,
      reviews: 324,
      badge: "FLASH SALE",
      category: "flash-sale",
      dealType: "limited-time",
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      features: ["Polarized Lenses", "UV Protection", "Lightweight Frame"],
      image: "/Image/1.jpeg",
      description: "Luxury aviator sunglasses with premium polarized lenses"
    },
    {
      id: 2,
      name: "Blue Light Blocking Glasses",
      originalPrice: 2999,
      dealPrice: 1499,
      discount: 50,
      rating: 4.7,
      reviews: 198,
      badge: "50% OFF",
      category: "clearance",
      dealType: "clearance",
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      features: ["99% Blue Light Block", "Anti-Glare", "Comfort Fit"],
      image: "/Image/10.jpeg",
      description: "Essential protection for digital device users"
    },
    {
      id: 3,
      name: "Designer Round Frames",
      originalPrice: 2799,
      dealPrice: 1399,
      discount: 50,
      rating: 4.9,
      reviews: 156,
      badge: "BUY 1 GET 1",
      category: "seasonal",
      dealType: "bogo",
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      features: ["Titanium Frame", "Crystal Lenses", "Designer Brand"],
      image: "/Image/2.jpeg",
      description: "Timeless round frames from premium designer collection"
    },
    {
      id: 4,
      name: "Kids Protective Eyewear",
      originalPrice: 1999,
      dealPrice: 999,
      discount: 50,
      rating: 4.6,
      reviews: 89,
      badge: "KIDS SPECIAL",
      category: "kids",
      dealType: "clearance",
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      features: ["Impact Resistant", "UV Protection", "Fun Designs"],
      image: "/Image/3.jpeg",
      description: "Durable and stylish eyewear designed for active kids"
    },
    {
      id: 5,
      name: "Sport Performance Glasses",
      originalPrice: 3299,
      dealPrice: 2299,
      discount: 30,
      rating: 4.8,
      reviews: 267,
      badge: "SPORT DEAL",
      category: "sports",
      dealType: "seasonal",
      endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      features: ["Anti-Fog Coating", "Wrap-Around Fit", "Polarized"],
      image: "/Image/30.jpeg",
      description: "High-performance eyewear for athletes and outdoor enthusiasts"
    },
    {
      id: 6,
      name: "Reading Glasses Collection",
      originalPrice: 1599,
      dealPrice: 799,
      discount: 50,
      rating: 4.5,
      reviews: 145,
      badge: "READING DEAL",
      category: "reading",
      dealType: "bundle",
      endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
      features: ["Multiple Powers", "Lightweight", "Stylish Frames"],
      image: "/Image/12.jpeg",
      description: "Complete reading glasses set with multiple magnification powers"
    },
    {
      id: 7,
      name: "Contact Lens Starter Kit",
      originalPrice: 2499,
      dealPrice: 1499,
      discount: 40,
      rating: 4.7,
      reviews: 203,
      badge: "STARTER KIT",
      category: "contacts",
      dealType: "bundle",
      endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      features: ["30 Day Supply", "Solution Included", "Trial Lenses"],
      image: "/Image/9.jpeg",
      description: "Everything you need to start your contact lens journey"
    },
    {
      id: 8,
      name: "Luxury Designer Sunglasses",
      originalPrice: 4999,
      dealPrice: 2999,
      discount: 40,
      rating: 4.9,
      reviews: 98,
      badge: "LUXURY DEAL",
      category: "luxury",
      dealType: "limited-time",
      endTime: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
      features: ["Premium Materials", "Designer Brand", "Limited Edition"],
      image: "/Image/32.jpeg",
      description: "Exclusive designer sunglasses from world-renowned brands"
    }
  ];

  const categories = [
    { id: "all", name: "All Deals", icon: FiPercent },
    { id: "flash-sale", name: "Flash Sale", icon: FiZap },
    { id: "clearance", name: "Clearance", icon: FiTag },
    { id: "seasonal", name: "Seasonal", icon: FiClock },
    { id: "kids", name: "Kids", icon: FiStar },
    { id: "sports", name: "Sports", icon: FiZap },
    { id: "reading", name: "Reading", icon: FiHeart },
    { id: "contacts", name: "Contacts", icon: FiTag },
    { id: "luxury", name: "Luxury", icon: FiPercent }
  ];

 
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const updatedTimeLeft = {};

      deals.forEach(deal => {
        const timeDiff = deal.endTime - now;
        if (timeDiff > 0) {
          updatedTimeLeft[deal.id] = {
            hours: Math.floor(timeDiff / (1000 * 60 * 60)),
            minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
          };
        } else {
          updatedTimeLeft[deal.id] = null;
        }
      });

      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredProducts = selectedCategory === "all"
    ? deals
    : deals.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      _id: product.id,
      name: product.name,
      price: product.dealPrice,
      image: product.image,
      quantity: 1
    }));
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 w-full">
      {/* Hero Section */}
     <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor}`}></div>
            <div className="relative max-w-7xl mx-auto px-4 h-full">
              <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                <div className="text-white z-10">
                  <p className="text-sm font-semibold mb-2 tracking-widest">{slide.subtitle}</p>
                  <h1 className="text-6xl font-bold mb-6 leading-tight">{slide.title}</h1>
                  <p className="text-lg mb-8 max-w-md opacity-90">{slide.description}</p>
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                    {slide.buttonText}
                  </button>
                </div>
                <div className="relative h-full flex items-center justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[500px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category.id
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <category.icon size={16} />
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.badge}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition">
                      <FiHeart size={16} />
                    </button>
                  </div>

                  {/* Countdown Timer */}
                  {timeLeft[product.id] && (
                    <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded-lg text-xs">
                      <div className="flex items-center gap-1 mb-1">
                        <FiClock size={12} />
                        <span>Ends in:</span>
                      </div>
                      <div className="font-mono">
                        {formatTime(timeLeft[product.id].hours)}:{formatTime(timeLeft[product.id].minutes)}:{formatTime(timeLeft[product.id].seconds)}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition flex items-center gap-2"
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
                      <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">₹{product.dealPrice}</span>
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {product.discount}% OFF
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium mb-3">
                    You save: ₹{product.originalPrice - product.dealPrice}
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <FiPercent size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No deals found</h3>
              <p className="text-gray-600">Check back later for new deals and offers.</p>
            </div>
          )}
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Potential Savings</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See how much you could save with our current deals and offers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-800 rounded-xl">
              <div className="text-4xl font-bold text-red-400 mb-2">₹2,500</div>
              <h3 className="text-xl font-bold mb-2">Average Savings</h3>
              <p className="text-gray-300">Per customer on today's deals</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-xl">
              <div className="text-4xl font-bold text-orange-400 mb-2">50%</div>
              <h3 className="text-xl font-bold mb-2">Maximum Discount</h3>
              <p className="text-gray-300">Up to 50% off on select items</p>
            </div>
            <div className="text-center p-8 bg-gray-800 rounded-xl">
              <div className="text-4xl font-bold text-yellow-400 mb-2">24hrs</div>
              <h3 className="text-xl font-bold mb-2">Deal Duration</h3>
              <p className="text-gray-300">Limited time offers available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FiPercent size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-xl mb-8">
            Subscribe to get exclusive deals and early access to flash sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
          <p className="text-sm mt-4 opacity-80">
            Get 10% off your first deal purchase when you subscribe!
          </p>
        </div>
      </section>
    </div>
  );
}
