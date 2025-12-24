import { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export default function RatingStars({ 
  value = 0, 
  onRate = null, 
  readOnly = false, 
  size = "md",
  showCount = false,
  reviewCount = 0,
  interactive = false 
}) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeMap = {
    sm: 12,
    md: 18,
    lg: 24,
    xl: 28
  };

  const starSize = sizeMap[size] || sizeMap.md;
  const displayRating = hoverRating || value;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;

  const handleStarClick = (index, half = false) => {
    if (interactive && onRate) {
      const rating = half ? index + 0.5 : index + 1;
      onRate(rating);
      setHoverRating(0);
    }
  };

  const handleStarHover = (index, half = false) => {
    if (interactive) {
      const rating = half ? index + 0.5 : index + 1;
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
      <div 
        className="flex gap-0.5 sm:gap-1"
        onMouseLeave={handleMouseLeave}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="relative cursor-pointer group"
            onClick={() => handleStarClick(index, false)}
            onMouseMove={() => handleStarHover(index, false)}
          >
            {/* Full Star */}
            {fullStars > index ? (
              <FaStar
                size={starSize}
                className="text-yellow-400 transition-all duration-150 group-hover:scale-110"
                style={{
                  filter: hoverRating > index ? "drop-shadow(0 0 4px rgba(250, 204, 21, 0.6))" : "none"
                }}
              />
            ) : hasHalfStar && index === fullStars ? (
              <div className="relative">
                <AiOutlineStar
                  size={starSize}
                  className="text-gray-300 transition-all duration-150"
                />
                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: "50%" }}>
                  <FaStar
                    size={starSize}
                    className="text-yellow-400 transition-all duration-150 group-hover:scale-110"
                    style={{
                      filter: hoverRating > index ? "drop-shadow(0 0 4px rgba(250, 204, 21, 0.6))" : "none"
                    }}
                  />
                </div>
              </div>
            ) : (
              <AiOutlineStar
                size={starSize}
                className="text-gray-300 transition-all duration-150 group-hover:text-yellow-300"
                style={{
                  filter: hoverRating > index ? "drop-shadow(0 0 4px rgba(250, 204, 21, 0.6))" : "none"
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Rating Text */}
      {showCount && (
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-800">
            {displayRating.toFixed(1)}
          </span>
          {reviewCount > 0 && (
            <span className="text-sm text-gray-600">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          )}
        </div>
      )}

      {/* Interactive Hint */}
      {interactive && !readOnly && (
        <span className="text-xs text-gray-500 ml-1">
          {displayRating > 0 ? `${Math.round(displayRating * 2) / 2} stars` : "Click to rate"}
        </span>
      )}
    </div>
  );
}
