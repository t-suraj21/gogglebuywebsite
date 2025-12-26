import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck, FiShield } from "react-icons/fi";
import { loginUser, clearError, clearSuccess } from "../redux/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [localSuccess, setLocalSuccess] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, user } = useSelector((state) => state.auth);

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // Handle successful login - redirect after showing success message
  useEffect(() => {
    if (success && user) {
      setLocalSuccess(true);
      
      // Clear success state and redirect after a delay
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
        setLocalSuccess(false);
        
        // Redirect based on login type
        if (isAdminLogin && user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [success, user, navigate, dispatch, isAdminLogin]);

  // Clear errors when component unmounts or when user starts typing
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearSuccess());
    };
  }, [dispatch]);

  const validateForm = () => {
    if (!email || !password) {
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false;
    }
    if (password.length < 6) {
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Dispatch login action
      const result = await dispatch(loginUser({ email: email.toLowerCase(), password })).unwrap();

      if (result) {
        // Check if admin login and user is not admin
        if (isAdminLogin && result.role !== "admin") {
          dispatch(clearSuccess());
          setLocalSuccess(false);
          alert("❌ Admin access required. This account is not an admin account.");
          return;
        }

        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
        } else {
          localStorage.removeItem("rememberEmail");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      // Error is already handled by Redux and displayed in UI
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">
        {/* Left Section - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome Back</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sign in to your Goggle account to continue shopping and manage your orders.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Secure Shopping</h3>
                <p className="text-gray-600">Shop with complete peace of mind</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Track Orders</h3>
                <p className="text-gray-600">Monitor your purchases in real-time</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Exclusive Deals</h3>
                <p className="text-gray-600">Access member-only offers and discounts</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
            <p className="text-gray-700 italic mb-4">"Best eyewear store online! Great quality and amazing customer service."</p>
            <div className="flex items-center gap-3">
              <div className="text-3xl">👨</div>
              <div>
                <p className="font-bold text-gray-900">Raj Kumar</p>
                <p className="text-sm text-gray-600">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
            {/* Header with Toggle */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {isAdminLogin ? "Admin Sign In" : "Sign In"}
                  </h2>
                  <p className="text-gray-600">
                    {isAdminLogin ? "Enter admin credentials" : "Enter your credentials to continue"}
                  </p>
                </div>
              </div>

              {/* User / Admin Toggle */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg mb-6">
                <button
                  type="button"
                  onClick={() => setIsAdminLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                    !isAdminLogin
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-transparent text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  👤 User Login
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all flex items-center justify-center gap-2 ${
                    isAdminLogin
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-transparent text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FiShield size={18} /> Admin Login
                </button>
              </div>
            </div>

            {/* Success Alert */}
            {localSuccess && user && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-bounce">
                <FiCheck className="text-green-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800">Login Successful! 🎉</p>
                  <p className="text-green-700 text-sm">
                    {isAdminLogin
                      ? `Welcome back Admin ${user.name}! Redirecting to dashboard...`
                      : `Welcome back ${user.name}! Redirecting...`}
                  </p>
                </div>
              </div>
            )}

            {/* Error Alert */}
            {error && !localSuccess && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <span className="text-red-600 text-2xl mt-1">⚠️</span>
                <div>
                  <p className="font-semibold text-red-800">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6" disabled={loading || localSuccess}>
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) dispatch(clearError());
                    }}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) dispatch(clearError());
                    }}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-bold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  isAdminLogin
                    ? "bg-gradient-to-r from-red-600 to-red-700"
                    : "bg-gradient-to-r from-blue-600 to-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    {isAdminLogin ? "Signing in as Admin..." : "Signing in..."}
                  </>
                ) : (
                  <>
                    {isAdminLogin ? (
                      <>
                        <FiShield size={20} />
                        Admin Sign In
                      </>
                    ) : (
                      <>
                        Sign In
                        <FiArrowRight size={20} />
                      </>
                    )}
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-600 font-medium">OR</span>
                </div>
              </div>

              {/* Social Login - Hide for Admin */}
              {!isAdminLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
                  >
                    <span className="text-xl">📧</span>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
                  >
                    <span className="text-xl">f</span>
                    Facebook
                  </button>
                </div>
              )}
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
              {isAdminLogin ? (
                <p className="text-gray-700">
                  <FiShield className="inline mr-2" size={18} />
                  Admin Panel Access Only
                </p>
              ) : (
                <p className="text-gray-700">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700 font-bold transition"
                  >
                    Sign Up
                  </Link>
                </p>
              )}
            </div>

            {/* Security Badge */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-600">
              <span>🔒</span>
              <span>This site is protected by reCAPTCHA and the Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
