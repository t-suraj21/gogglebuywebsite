import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/authSlice";

export default function SplashScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [shouldShowSplash, setShouldShowSplash] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem("hasVisitedSplash");
    
    if (!hasVisited) {
      // First time visitor - show splash screen
      setShouldShowSplash(true);
      sessionStorage.setItem("hasVisitedSplash", "true");

      // Restore user if token exists
      if (token) {
        dispatch(fetchUserProfile());
      }

      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      // Navigate after 3 seconds
      const timer = setTimeout(() => {
        navigate("/home");
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      // User has visited before - skip splash and go to home
      if (token) {
        dispatch(fetchUserProfile());
      }
      navigate("/home");
    }
  }, [token, navigate, dispatch]);

  const handleVideoError = () => {
    setVideoError(true);
    console.log("Video failed to load - showing fallback background");
  };

  if (!shouldShowSplash) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-50">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1920&q=80"
          alt="Eyewear Splash"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-left space-y-8 animate-fadeIn">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md text-white/90 rounded-full text-sm font-semibold tracking-wider uppercase border border-white/20">
                Best Choice of This Week
              </span>
              
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none">
                <span className="block text-white drop-shadow-2xl">EYEWEAR</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/90 font-light tracking-wide">
                Discover premium eyewear that defines your style
              </p>
            </div>

            <button className="group px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 flex items-center gap-3 w-fit">
              <span>SHOP NOW</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Progress Bar */}
            <div className="w-full max-w-md">
              <div className="h-1.5 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden shadow-lg">
                <div
                  className="h-full bg-gradient-to-r from-white via-blue-200 to-white transition-all duration-300 shadow-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-white/70 mt-2 font-medium">
                <span>Loading Experience</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>

          {/* Right Side - Logo/Brand */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
              <div className="relative w-48 h-48 bg-white/5 backdrop-blur-lg rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 group-hover:scale-110 transition-transform duration-500">
                <div className="text-9xl animate-bounce-slow">👓</div>
              </div>
            </div>
            
            <h2 className="mt-8 text-5xl font-black tracking-wider bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-xl">
              BUYCHASHME
            </h2>
            <p className="text-white/80 text-lg tracking-[0.3em] uppercase mt-2">
              Premium Collection
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
    </div>
  );
}
