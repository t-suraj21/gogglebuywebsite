import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FiEdit2, FiLogOut, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiShoppingBag, FiSettings, FiLock, FiBell, FiHeart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+1 (555) 000-0000",
    address: user?.address || "123 Fashion Street, NY 10001",
    city: user?.city || "New York",
    country: user?.country || "United States",
    postalCode: user?.postalCode || "10001"
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // TODO: API call to update profile
    setEditMode(false);
  };

  const stats = [
    { icon: FiShoppingBag, label: "Total Orders", value: "12", color: "bg-blue-100 text-blue-600" },
    { icon: FiHeart, label: "Wishlist", value: "8", color: "bg-pink-100 text-pink-600" },
    { icon: FiBell, label: "Rewards Points", value: "2,450", color: "bg-yellow-100 text-yellow-600" },
    { icon: FiLock, label: "Account Status", value: "Active", color: "bg-green-100 text-green-600" }
  ];

  const recentOrders = [
    { id: "#ORD-001", date: "Dec 15, 2025", total: "$599.99", status: "Delivered" },
    { id: "#ORD-002", date: "Dec 10, 2025", total: "$349.99", status: "In Transit" },
    { id: "#ORD-003", date: "Dec 05, 2025", total: "$199.99", status: "Processing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <FaUserCircle size={80} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{user?.name || "User"}</h1>
              <p className="text-blue-100 mt-2">Member since November 2024</p>
              <div className="mt-4 inline-block px-3 py-1 bg-blue-500 rounded-full text-sm font-semibold">
                ⭐ Premium Member
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`${stat.color} rounded-lg p-6 shadow-md`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold opacity-75">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon size={32} className="opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b">
            <div className="flex flex-wrap">
              {[
                { id: "profile", label: "Profile", icon: FiUser },
                { id: "orders", label: "My Orders", icon: FiShoppingBag },
                { id: "addresses", label: "Addresses", icon: FiMapPin },
                { id: "settings", label: "Settings", icon: FiSettings }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-semibold transition border-b-2 ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <FiEdit2 size={18} />
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                {editMode ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleEditChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <FiUser className="text-blue-600 mt-1" size={24} />
                        <div>
                          <p className="text-sm text-gray-600">Full Name</p>
                          <p className="text-lg font-semibold text-gray-900">{formData.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <FiMail className="text-blue-600 mt-1" size={24} />
                        <div>
                          <p className="text-sm text-gray-600">Email Address</p>
                          <p className="text-lg font-semibold text-gray-900">{formData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <FiPhone className="text-blue-600 mt-1" size={24} />
                        <div>
                          <p className="text-sm text-gray-600">Phone Number</p>
                          <p className="text-lg font-semibold text-gray-900">{formData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <FiCalendar className="text-blue-600 mt-1" size={24} />
                        <div>
                          <p className="text-sm text-gray-600">Member Since</p>
                          <p className="text-lg font-semibold text-gray-900">November 2024</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <FiMapPin className="text-blue-600 mt-1" size={24} />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="text-lg font-semibold text-gray-900">{formData.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <FiMapPin className="text-blue-600 mt-1" size={24} />
                        <div>
                          <p className="text-sm text-gray-600">City, Postal Code</p>
                          <p className="text-lg font-semibold text-gray-900">{formData.city}, {formData.postalCode}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <FiMapPin className="text-blue-600 mt-1" size={24} />
                        <div>
                          <p className="text-sm text-gray-600">Country</p>
                          <p className="text-lg font-semibold text-gray-900">{formData.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {recentOrders.map((order, idx) => (
                    <div key={idx} className="border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                          <p className="text-gray-600 text-sm mt-1">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{order.total}</p>
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Delivered" ? "bg-green-100 text-green-700" :
                            order.status === "In Transit" ? "bg-blue-100 text-blue-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/orders"
                  className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  View All Orders
                </Link>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Addresses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border-2 border-blue-300 bg-blue-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Home</h3>
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">Default</span>
                    </div>
                    <p className="text-gray-700">{formData.address}</p>
                    <p className="text-gray-600 text-sm mt-2">{formData.city}, {formData.postalCode}</p>
                    <p className="text-gray-600 text-sm">{formData.country}</p>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                    <div className="flex items-center justify-center h-full">
                      <button className="text-center">
                        <div className="text-4xl mb-2">➕</div>
                        <p className="text-gray-700 font-semibold">Add New Address</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                        <p className="text-gray-600 text-sm mt-1">Update your password to keep your account secure</p>
                      </div>
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                        <FiLock className="inline mr-2" size={18} />
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Email Notifications</h3>
                        <p className="text-gray-600 text-sm mt-1">Manage how you receive updates about orders and promotions</p>
                      </div>
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                        <FiBell className="inline mr-2" size={18} />
                        Manage
                      </button>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Delete Account</h3>
                        <p className="text-gray-600 text-sm mt-1">Permanently delete your account and all associated data</p>
                      </div>
                      <button className="px-4 py-2 border-2 border-red-300 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition">
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6 mt-6">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                      <FiLogOut size={20} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
