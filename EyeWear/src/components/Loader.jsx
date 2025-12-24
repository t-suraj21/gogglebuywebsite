export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-2">
      <div className="text-center w-full max-w-xs sm:max-w-md mx-auto">
        {/* Spinner Animation */}
        <div className="inline-flex items-center justify-center mb-6">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16">
            {/* Outer spinning ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
            {/* Middle spinning ring */}
            <div className="absolute inset-2 border-4 border-transparent border-b-blue-400 border-l-blue-400 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "2s" }}></div>
            {/* Inner pulsing circle */}
            <div className="absolute inset-4 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        {/* Loading Text */}
        <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Loading</p>
        <div className="flex justify-center gap-1 mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
        </div>
        {/* Loading Description */}
        <p className="text-xs sm:text-sm text-gray-600">Please wait while we fetch your data</p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
