import { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

export default function SuccessPopup({ 
  isOpen, 
  onClose, 
  title = "Success", 
  message = "Operation completed successfully",
  type = "success",
  autoClose = true,
  autoCloseDuration = 3000
}) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
    
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDuration, onClose]);

  if (!isVisible) return null;

  const getColors = () => {
    switch(type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "text-green-600 bg-green-100",
          title: "text-green-900",
          message: "text-green-700",
          button: "bg-green-600 hover:bg-green-700"
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: "text-red-600 bg-red-100",
          title: "text-red-900",
          message: "text-red-700",
          button: "bg-red-600 hover:bg-red-700"
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: "text-yellow-600 bg-yellow-100",
          title: "text-yellow-900",
          message: "text-yellow-700",
          button: "bg-yellow-600 hover:bg-yellow-700"
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-600 bg-blue-100",
          title: "text-blue-900",
          message: "text-blue-700",
          button: "bg-blue-600 hover:bg-blue-700"
        };
    }
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50">
      <div className={`${colors.bg} border-2 ${colors.border} rounded-2xl shadow-2xl max-w-sm w-full animate-in fade-in zoom-in-95 duration-300`}>
        <div className="p-6 sm:p-8">
          {/* Icon */}
          <div className={`w-16 h-16 ${colors.icon} rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce`}>
            <FiCheck size={32} />
          </div>

          {/* Title */}
          <h2 className={`text-center text-xl sm:text-2xl font-bold ${colors.title} mb-2`}>
            {title}
          </h2>

          {/* Message */}
          <p className={`text-center ${colors.message} mb-6 text-sm sm:text-base`}>
            {message}
          </p>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className={`w-full py-2.5 sm:py-3 ${colors.button} text-white font-semibold rounded-lg transition-colors duration-200`}
          >
            OK
          </button>
        </div>

        {/* Close Icon */}
        <button
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          className="absolute top-4 right-4 p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <FiX size={24} className={colors.title} />
        </button>
      </div>
    </div>
  );
}
