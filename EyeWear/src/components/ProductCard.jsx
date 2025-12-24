import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import AuthModal from "./AuthModal";
import AddToCartPopup from "./AddToCartPopup";
import BuyNowPopup from "./BuyNowPopup";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAddToCartPopup, setShowAddToCartPopup] = useState(false);
  const [showBuyNowPopup, setShowBuyNowPopup] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount || 0,
      image: product.images?.[0],
      brand: product.brand,
      quantity: 1
    }));
    setShowAddToCartPopup(true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount || 0,
      image: product.images?.[0],
      brand: product.brand,
      quantity: 1
    }));
    setShowBuyNowPopup(true);
  };

  const handleLoginSuccess = () => {
    // After login, add to cart
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount || 0,
      image: product.images?.[0],
      brand: product.brand,
      quantity: 1
    }));
    setShowAddToCartPopup(true);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const discount = product.discount || Math.floor(Math.random() * 40) + 10;
  const rating = product.rating || (Math.random() * 2 + 3).toFixed(1);
  const reviews = product.reviews || Math.floor(Math.random() * 500) + 50;
  const inStock = product.inStock !== false;

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        window.location.href = `/product/${product._id}`;
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[1/1] w-full">
        {/* Main Image */}
        <img
          src={product.images?.[0] || "/Image/1.jpeg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80";
          }}
        />

        {/* Overlay on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3">
            <button
              className="bg-white text-black p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/product/${product._id}`;
              }}
            >
              <FiEye size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(e);
              }}
              className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg"
            >
              <FiShoppingCart size={20} />
            </button>
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}

        {/* Stock Status Badge */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-xl">Out of Stock</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        >
          {isFavorite ? (
            <FaHeart size={18} className="text-red-500" />
          ) : (
            <FiHeart size={18} className="text-gray-600" />
          )}
        </button>

        {/* Badge for New/Sale */}
        {product.isNew && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            NEW
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
            {product.brand}
          </p>
        )}

        {/* Product Name */}
        <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(rating) ? "⭐" : "☆"}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {rating} ({reviews} reviews)
          </span>
        </div>

        {/* Price Section */}
        <div className="mb-2 sm:mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{Math.floor(product.price * (1 - discount / 100))}
            </span>
            {discount > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.price}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-full py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <FiShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Add to Cart Popup */}
      <AddToCartPopup
        isOpen={showAddToCartPopup}
        onClose={() => setShowAddToCartPopup(false)}
        productName={product.name}
        productImage={product.images?.[0]}
        productPrice={product.price}
        productDiscount={discount}
      />

      {/* Buy Now Popup */}
      <BuyNowPopup
        isOpen={showBuyNowPopup}
        onClose={() => setShowBuyNowPopup(false)}
        productName={product.name}
        productImage={product.images?.[0]}
        productPrice={product.price}
        productDiscount={discount}
      />
    </div>
  );
}
