import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { loginUser, clearError } from "../redux/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

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

    if (!validateForm()) return;

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      }

      navigate("/home");
    } catch (err) {
      // Error is handled by Redux
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
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">Enter your credentials to continue</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <span className="text-red-600 text-2xl mt-1">⚠️</span>
                <div>
                  <p className="font-semibold text-red-800">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight size={20} />
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

              {/* Social Login */}
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
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-700">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-bold transition"
                >
                  Sign Up
                </Link>
              </p>
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
