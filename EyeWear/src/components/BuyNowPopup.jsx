import { useEffect, useState } from "react";
import { FiX, FiTruck } from "react-icons/fi";

export default function BuyNowPopup({ 
  isOpen, 
  onClose, 
  productName = "Product",
  productImage = "/Image/1.jpeg",
  productPrice = 0,
  productDiscount = 0
}) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
    
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  const discountedPrice = productPrice * (1 - productDiscount / 100);

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <FiTruck size={24} />
            <h2 className="text-xl font-bold">Ready to Buy!</h2>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="text-white hover:bg-white/20 p-1 rounded-full transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Product Image */}
          <div className="mb-6 rounded-lg overflow-hidden bg-gray-100 h-40">
            <img 
              src={productImage} 
              alt={productName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80";
              }}
            />
          </div>

          {/* Product Details */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {productName}
          </h3>

          {/* Price */}
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-green-600">
              ₹{Math.floor(discountedPrice)}
            </span>
            {productDiscount > 0 && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{productPrice}
                </span>
                <span className="text-sm font-semibold text-red-600">
                  Save {productDiscount}%
                </span>
              </>
            )}
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-700 font-medium text-sm sm:text-base text-center">
              🎉 You're about to buy this item!
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsVisible(false);
                onClose?.();
              }}
              className="flex-1 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
            >
              Continue
            </button>
            <button
              onClick={() => {
                window.location.href = "/checkout";
              }}
              className="flex-1 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
