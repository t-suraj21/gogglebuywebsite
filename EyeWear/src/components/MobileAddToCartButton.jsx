import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiX } from "react-icons/fi";

export default function MobileAddToCartButton() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);
  const cartCount = cartItems.length;

  useEffect(() => {
    // Show floating button only on mobile and if cart has items
    const handleResize = () => {
      if (window.innerWidth < 768 && cartCount > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cartCount]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] md:hidden">
      <button
        onClick={() => navigate("/cart")}
        className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 font-bold text-lg animate-bounce"
      >
        <FiShoppingCart size={24} />
        <span>Cart</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
