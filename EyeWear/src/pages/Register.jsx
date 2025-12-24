import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { registerUser, clearError } from "../redux/authSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be at least 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "password") {
      calculatePasswordStrength(value);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(registerUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password
      })).unwrap();

      navigate("/home");
    } catch (err) {
      // Error is handled by Redux
    }
  };

  const passwordStrengthColor = {
    0: "bg-gray-300",
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-yellow-500",
    4: "bg-lime-500",
    5: "bg-green-500"
  };

  const passwordStrengthText = {
    0: "",
    1: "Weak",
    2: "Fair",
    3: "Good",
    4: "Strong",
    5: "Very Strong"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Info */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
              <h2 className="text-4xl font-bold mb-6">Join Goggle</h2>
              <p className="text-lg text-blue-100 mb-8">
                Discover premium eyewear and join thousands of satisfied customers worldwide.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "✨", title: "Premium Collection", desc: "Curated selection of luxury eyewear" },
                  { icon: "🚚", title: "Fast Shipping", desc: "Free delivery on orders over $50" },
                  { icon: "🔒", title: "Secure Shopping", desc: "100% secure transactions" },
                  { icon: "💬", title: "24/7 Support", desc: "Always here to help you" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-blue-100 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                <p className="text-sm text-blue-100 mb-3">⭐ "Best eyewear shopping experience ever!" - Sarah M.</p>
                <p className="text-sm text-blue-100">⭐ "Love the quality and fast delivery!" - John D.</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-600 mt-2">Join our community and start shopping</p>
            </div>

            {(error || errors.submit) && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 rounded-lg">
                <p className="text-red-700 font-semibold">{error || errors.submit}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.fullName
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-blue-600 bg-white"
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.email
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-blue-600 bg-white"
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.phone
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-blue-600 bg-white"
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.password
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-blue-600 bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}

                {/* Password Strength */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-600">Password Strength</p>
                      <span className={`text-xs font-bold ${
                        passwordStrength <= 2 ? "text-red-600" :
                        passwordStrength <= 3 ? "text-yellow-600" :
                        "text-green-600"
                      }`}>
                        {passwordStrengthText[passwordStrength]}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrengthColor[passwordStrength]} transition-all duration-300`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition ${
                      errors.confirmPassword
                        ? "border-red-500 focus:border-red-600 bg-red-50"
                        : "border-gray-300 focus:border-blue-600 bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                {formData.password && formData.confirmPassword === formData.password && (
                  <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                    <FiCheck size={16} /> Passwords match
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (e.target.checked && errors.terms) {
                        setErrors(prev => ({ ...prev, terms: "" }));
                      }
                    }}
                    className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 font-semibold hover:underline">Terms & Conditions</a>
                    {" "}and{" "}
                    <a href="#" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.terms && <p className="text-red-600 text-sm mt-2">{errors.terms}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-600 font-semibold">Or sign up with</span>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
                >
                  <FaGoogle size={20} className="text-red-500" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
                >
                  <FaFacebook size={20} className="text-blue-600" />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-700"
                >
                  <FaApple size={20} className="text-black" />
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-bold hover:text-blue-700 transition"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
