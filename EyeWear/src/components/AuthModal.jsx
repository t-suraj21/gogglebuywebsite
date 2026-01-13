import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiX, FiMail, FiLock, FiUser } from "react-icons/fi";
import { loginUser, registerUser, hideLoginPopup } from "../redux/authSlice";

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authLoading = useSelector((state) => state.auth.loading);
  const isOpen = useSelector((state) => state.auth.showLoginPopup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const result = await dispatch(loginUser({ email, password })).unwrap();
        if (result) {
          setEmail("");
          setPassword("");
          dispatch(hideLoginPopup());
          navigate("/home");
        }
      } else {
        const result = await dispatch(registerUser({ name, email, password })).unwrap();
        if (result) {
          setEmail("");
          setPassword("");
          setName("");
          dispatch(hideLoginPopup());
          navigate("/home");
        }
      }
    } catch (err) {
      setError(err || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={() => dispatch(hideLoginPopup())}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <FiX size={24} className="text-gray-600" />
        </button>

        {/* Header */}
        <div className="px-6 pt-8 pb-4">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Name Field (Register Only) */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 mt-6"
          >
            {loading || authLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="px-6 pb-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setEmail("");
                setPassword("");
                setName("");
              }}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              {isLogin ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
