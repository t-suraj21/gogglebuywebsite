import { useState, useEffect } from "react";
import { FiSmile, FiShield, FiHeart, FiStar, FiShoppingCart, FiTrendingUp, FiAward } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function KidsGlasses() {
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const dispatch = useDispatch();

  const kidsGlasses = [
    {
      id: 1,
      name: "Dinosaur Adventure Frames",
      price: 1299,
      rating: 4.8,
      reviews: 203,
      badge: "Kids Favorite",
      ageGroup: "3-6",
      style: "fun",
      frameColor: "Green Dino",
      features: ["Dinosaur Design", "Flexible", "UV Protection"],
      image: "/Image/3.jpeg",
      description: "Adventurous dinosaur frames that make wearing glasses fun!"
    },
    {
      id: 2,
      name: "Unicorn Magic Glasses",
      price: 1499,
      rating: 4.9,
      reviews: 156,
      badge: "Magical",
      ageGroup: "4-8",
      style: "princess",
      frameColor: "Pink Unicorn",
      features: ["Unicorn Horn", "Sparkly Design", "Comfortable"],
      image: "/Image/29.jpeg",
      description: "Magical unicorn frames with rainbow colors and sparkles"
    },
    {
      id: 3,
      name: "Superhero Vision Frames",
      price: 1399,
      rating: 4.7,
      reviews: 189,
      badge: "Hero",
      ageGroup: "5-10",
      style: "superhero",
      frameColor: "Blue Hero",
      features: ["Superhero Design", "Durable", "Adjustable"],
      image: "/Image/5.jpeg",
      description: "Be a superhero with these cool, durable frames"
    },
    {
      id: 4,
      name: "Animal Friends Collection",
      price: 1199,
      rating: 4.6,
      reviews: 134,
      badge: "Cute",
      ageGroup: "2-5",
      style: "animal",
      frameColor: "Colorful Animals",
      features: ["Animal Characters", "Soft Touch", "Safe Edges"],
      image: "/Image/7.jpeg",
      description: "Adorable animal-themed frames for little ones"
    },
    {
      id: 5,
      name: "Space Explorer Glasses",
      price: 1599,
      rating: 4.8,
      reviews: 112,
      badge: "Explorer",
      ageGroup: "6-12",
      style: "space",
      frameColor: "Space Blue",
      features: ["Rocket Design", "Starry Pattern", "Lightweight"],
      image: "/Image/14.jpeg",
      description: "Explore the cosmos with these space-themed adventure frames"
    },
    {
      id: 6,
      name: "Princess Crown Frames",
      price: 1699,
      rating: 4.9,
      reviews: 98,
      badge: "Royal",
      ageGroup: "4-9",
      style: "princess",
      frameColor: "Gold Crown",
      features: ["Crown Design", "Gem Accents", "Elegant"],
      image: "/Image/29.jpeg",
      description: "Feel like royalty with crown-shaped frames and gem details"
    },
    {
      id: 7,
      name: "Sporty Kid Frames",
      price: 1399,
      rating: 4.5,
      reviews: 167,
      badge: "Active",
      ageGroup: "7-14",
      style: "sport",
      frameColor: "Neon Green",
      features: ["Impact Resistant", "Flexible", "Secure Fit"],
      image: "/Image/2.jpeg",
      description: "Perfect for active kids with durable, flexible frames"
    },
    {
      id: 8,
      name: "Classic Kids Frames",
      price: 999,
      rating: 4.4,
      reviews: 145,
      badge: "Classic",
      ageGroup: "3-12",
      style: "classic",
      frameColor: "Navy Blue",
      features: ["Timeless Design", "Comfortable", "Affordable"],
      image: "/Image/11.jpeg",
      description: "Simple, comfortable frames that grow with your child"
    }
  ];

  const ageGroups = [
    { id: "all", name: "All Ages", icon: FiSmile },
    { id: "2-5", name: "2-5 Years", icon: FiHeart },
    { id: "3-6", name: "3-6 Years", icon: FiStar },
    { id: "4-8", name: "4-8 Years", icon: FiTrendingUp },
    { id: "5-10", name: "5-10 Years", icon: FiAward },
    { id: "6-12", name: "6-12 Years", icon: FiShield },
    { id: "7-14", name: "7-14 Years", icon: FiTrendingUp }
  ];

  const styles = [
    { id: "all", name: "All Styles" },
    { id: "fun", name: "Fun & Playful" },
    { id: "princess", name: "Princess" },
    { id: "superhero", name: "Superhero" },
    { id: "animal", name: "Animal" },
    { id: "space", name: "Space" },
    { id: "sport", name: "Sport" },
    { id: "classic", name: "Classic" }
  ];

  const benefits = [
    {
      icon: FiShield,
      title: "Kid-Safe Design",
      description: "Rounded edges, flexible materials, and safe for active play"
    },
    {
      icon: FiSmile,
      title: "Fun Designs",
      description: "Colorful characters and themes that kids love to wear"
    },
    {
      icon: FiHeart,
      title: "Comfort First",
      description: "Soft nose pads and lightweight frames for all-day comfort"
    },
    {
      icon: FiAward,
      title: "Growing With Them",
      description: "Adjustable features that adapt as your child grows"
    }
  ];

  const safetyFeatures = [
    {
      title: "Impact Resistant",
      description: "Frames designed to withstand bumps and falls",
      icon: "🛡️"
    },
    {
      title: "UV Protection",
      description: "Blocks 100% of harmful UV rays",
      icon: "☀️"
    },
    {
      title: "Hypoallergenic",
      description: "Gentle materials safe for sensitive skin",
      icon: "🌿"
    },
    {
      title: "Flexible Fit",
      description: "Adjustable temples and nose pads",
      icon: "🔧"
    }
  ];

  const filteredProducts = kidsGlasses.filter(product => {
    const ageMatch = selectedAge === "all" || product.ageGroup === selectedAge;
    const styleMatch = selectedStyle === "all" || product.style === selectedStyle;
    return ageMatch && styleMatch;
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
     <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <FiSmile size={32} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Kids Glasses</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Fun, safe, and comfortable glasses designed specifically for children.
            Make wearing glasses an adventure with our colorful and playful designs!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">Kid-Safe Design</div>
            <div className="bg-white/20 px-4 py-2 rounded-full">Fun Characters</div>
            <div className="bg-white/20 px-4 py-2 rounded-full">UV Protection</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Kids Glasses?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our children's glasses are designed with both safety and fun in mind,
              ensuring your child looks great while protecting their precious eyes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl hover:shadow-lg transition">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                  <benefit.icon size={28} className="text-yellow-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety First</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every pair of our kids glasses meets the highest safety standards
              to protect your child's eyes and ensure comfortable wear.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            {/* Age Group Filters */}
            <div className="flex flex-wrap gap-2">
              {ageGroups.map((age) => (
                <button
                  key={age.id}
                  onClick={() => setSelectedAge(age.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedAge === age.id
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <age.icon size={16} />
                  {age.name}
                </button>
              ))}
            </div>

            {/* Style Filter and Sort */}
            <div className="flex items-center gap-4">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {styles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                      className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition flex items-center gap-2"
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
                      <span key={index} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Age:</span> {product.ageGroup} • <span className="font-medium">Color:</span> {product.frameColor}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm"
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
              <FiSmile size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No kids glasses found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new arrivals.</p>
            </div>
          )}
        </div>
      </section>

      {/* Children's Vision Education */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Children's Vision Development</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Understanding your child's vision needs helps ensure they get the right eyewear
              for healthy eye development and academic success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-4xl mb-4">👶</div>
              <h3 className="text-xl font-bold mb-3">Early Detection</h3>
              <p className="text-gray-300 mb-4">
                Regular eye exams starting from age 1 can detect vision problems early
                when they're most treatable.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Infant eye exams at 6 months</li>
                <li>• Preschool screening at age 3</li>
                <li>• Before starting school</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3">School Performance</h3>
              <p className="text-gray-300 mb-4">
                Clear vision is crucial for learning. Undetected vision problems
                can affect reading, concentration, and academic achievement.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• 80% of learning is visual</li>
                <li>• Vision affects attention span</li>
                <li>• Early correction prevents issues</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-3">Digital Eye Strain</h3>
              <p className="text-gray-300 mb-4">
                Children spend more time on screens than ever. Blue light protection
                helps prevent digital eye strain and sleep disruption.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Blue light blocking lenses</li>
                <li>• Reduced eye fatigue</li>
                <li>• Better sleep quality</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Themes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fun Themes & Characters</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our kids glasses feature popular characters and themes that children love,
              making wearing glasses an exciting part of their day!
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="text-6xl mb-3">🦕</div>
              <h3 className="font-bold text-gray-900 mb-2">Dinosaurs</h3>
              <p className="text-sm text-gray-600">Roaring adventures await!</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl">
              <div className="text-6xl mb-3">🦄</div>
              <h3 className="font-bold text-gray-900 mb-2">Unicorns</h3>
              <p className="text-sm text-gray-600">Magical and sparkly fun!</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <div className="text-6xl mb-3">🦸‍♂️</div>
              <h3 className="font-bold text-gray-900 mb-2">Superheroes</h3>
              <p className="text-sm text-gray-600">Be a hero every day!</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <div className="text-6xl mb-3">🚀</div>
              <h3 className="font-bold text-gray-900 mb-2">Space</h3>
              <p className="text-sm text-gray-600">Explore the cosmos!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Resources */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FiAward size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Parent Resources</h2>
          <p className="text-xl mb-8">
            Everything parents need to know about children's vision health and eyewear.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-lg text-left">
              <h3 className="font-bold mb-3">Vision Development Milestones</h3>
              <ul className="space-y-2 text-sm">
                <li>• Birth-2 months: Light perception</li>
                <li>• 3-6 months: Color recognition</li>
                <li>• 1-2 years: Visual acuity develops</li>
                <li>• 3-5 years: Full color vision</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-lg text-left">
              <h3 className="font-bold mb-3">When to See an Eye Doctor</h3>
              <ul className="space-y-2 text-sm">
                <li>• Crossed or wandering eyes</li>
                <li>• Frequent eye rubbing</li>
                <li>• Poor hand-eye coordination</li>
                <li>• Difficulty reading or learning</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Download Vision Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
