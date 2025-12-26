import { useEffect, useState } from "react";
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign, FiActivity, FiTrendingUp } from "react-icons/fi";
import { MdPending, MdDownloadDone } from "react-icons/md";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [dashboardRes, ordersRes] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/orders")
      ]);

      const { stats: dashboardStats } = dashboardRes.data;
      const allOrders = ordersRes.data;

      // Calculate order status breakdown
      const orderStats = {
        pendingOrders: allOrders.filter(order => order.status === 'pending').length,
        processingOrders: allOrders.filter(order => order.status === 'processing').length,
        shippedOrders: allOrders.filter(order => order.status === 'shipped').length,
        deliveredOrders: allOrders.filter(order => order.status === 'delivered').length
      };

      setStats({
        ...dashboardStats,
        ...orderStats
      });

      // Get recent 5 orders
      setRecentOrders(allOrders.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your complete business overview.</p>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold opacity-90">Total Users</h2>
                <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
                <p className="text-xs opacity-75 mt-1">+{stats.newUsersThisMonth} this month</p>
              </div>
              <FiUsers size={40} className="opacity-50" />
            </div>
          </div>

          {/* Active Users */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold opacity-90">Active Users</h2>
                <p className="text-3xl font-bold mt-2">{stats.activeUsers}</p>
                <p className="text-xs opacity-75 mt-1">{stats.totalLogins} total logins</p>
              </div>
              <FiActivity size={40} className="opacity-50" />
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold opacity-90">Total Products</h2>
                <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
                <p className="text-xs opacity-75 mt-1">In inventory</p>
              </div>
              <FiPackage size={40} className="opacity-50" />
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold opacity-90">Total Orders</h2>
                <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
                <p className="text-xs opacity-75 mt-1">All time</p>
              </div>
              <FiShoppingBag size={40} className="opacity-50" />
            </div>
          </div>
        </div>

        {/* Revenue & Order Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold opacity-90">Total Revenue</h2>
                <p className="text-3xl font-bold mt-2">₹{stats.totalRevenue.toFixed(2)}</p>
                <p className="text-xs opacity-75 mt-1">From delivered orders</p>
              </div>
              <FiDollarSign size={40} className="opacity-50" />
            </div>
          </div>

          {/* Growth Rate */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold opacity-90">Growth Rate</h2>
                <p className="text-3xl font-bold mt-2">{stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1) : 0}%</p>
                <p className="text-xs opacity-75 mt-1">Delivery success rate</p>
              </div>
              <FiTrendingUp size={40} className="opacity-50" />
            </div>
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Status Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Pending */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Pending</h3>
                <MdPending size={20} className="text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
              <p className="text-xs text-gray-600 mt-1">
                {stats.totalOrders > 0 ? ((stats.pendingOrders / stats.totalOrders) * 100).toFixed(1) : 0}% of orders
              </p>
            </div>

            {/* Processing */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Processing</h3>
                <FiPackage size={20} className="text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.processingOrders}</p>
              <p className="text-xs text-gray-600 mt-1">
                {stats.totalOrders > 0 ? ((stats.processingOrders / stats.totalOrders) * 100).toFixed(1) : 0}% of orders
              </p>
            </div>

            {/* Shipped */}
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Shipped</h3>
                <FiShoppingBag size={20} className="text-indigo-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.shippedOrders}</p>
              <p className="text-xs text-gray-600 mt-1">
                {stats.totalOrders > 0 ? ((stats.shippedOrders / stats.totalOrders) * 100).toFixed(1) : 0}% of orders
              </p>
            </div>

            {/* Delivered */}
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Delivered</h3>
                <MdDownloadDone size={20} className="text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.deliveredOrders}</p>
              <p className="text-xs text-gray-600 mt-1">
                {stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1) : 0}% of orders
              </p>
            </div>

            {/* Revenue Summary */}
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-700">Revenue</h3>
                <FiDollarSign size={20} className="text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toFixed(0)}</p>
              <p className="text-xs text-gray-600 mt-1">Total earnings</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FiUsers size={24} />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-lg font-semibold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <MdDownloadDone size={24} />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered Orders</p>
                <p className="text-lg font-semibold text-gray-900">{stats.deliveredOrders}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <FiDollarSign size={24} />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-lg font-semibold text-gray-900">₹{stats.totalRevenue.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Preview */}
        {recentOrders.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">#{order._id?.slice(-8) || order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.userId?.name || order.userName || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.total?.toFixed(2) || '0.00'}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
