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

  useEffect(() => {
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
  }, [token, navigate, dispatch]);

  const handleVideoError = () => {
    setVideoError(true);
    console.log("Video failed to load - showing fallback background");
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden z-50">
      {/* Video Background */}
      <div className="absolute inset-0">
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={handleVideoError}
          >
            <source src="/videos/eyewearvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"></div>
        )}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/40 animate-gradient"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
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
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
          <div className="relative w-40 h-40 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/20">
            <div className="text-7xl animate-bounce-slow">👓</div>
          </div>
        </div>

        <h1 className="text-7xl font-black tracking-wider mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          CHASHME
        </h1>

        <p className="text-xl text-white/90 tracking-[0.3em] uppercase mb-10">
          Premium Eyewear
        </p>

        {/* Progress Bar */}
        <div className="w-80 mb-4">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
