import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../services/api";
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiDownload, FiEye, FiArrowLeft } from "react-icons/fi";
import { MdPending } from "react-icons/md";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?._id) {
          const res = await api.get(`/orders/user/${user._id}`);
          setOrders(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <MdPending className="text-yellow-500" size={24} />;
      case "processing":
        return <FiPackage className="text-blue-500" size={24} />;
      case "shipped":
        return <FiTruck className="text-blue-600" size={24} />;
      case "delivered":
        return <FiCheckCircle className="text-green-500" size={24} />;
      case "cancelled":
        return <span className="text-2xl">❌</span>;
      default:
        return <FiClock className="text-gray-500" size={24} />;
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      processing: "bg-blue-100 text-blue-800 border-blue-300",
      shipped: "bg-indigo-100 text-indigo-800 border-indigo-300",
      delivered: "bg-green-100 text-green-800 border-green-300",
      cancelled: "bg-red-100 text-red-800 border-red-300"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusSteps = (status) => {
    const steps = {
      pending: 1,
      processing: 2,
      shipped: 3,
      delivered: 4
    };
    return steps[status] || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 w-full">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        </div>
    );
  }


  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your orders</p>
          <Link
            to="/login"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition"
          >
            <FiArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your purchases</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="mb-4 text-6xl">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't placed any orders. Start shopping today!</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(order.status)}
                        <h3 className="text-xl font-bold text-gray-900">
                          Order #{order._id?.slice(-8).toUpperCase()}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">
                        ₹{order.total?.toFixed(2) || "0.00"}
                      </p>
                      <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold border capitalize ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Status Timeline */}
                <div className="px-6 py-6 border-b bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition ${
                          getStatusSteps(order.status) >= step ? "bg-blue-600" : "bg-gray-300"
                        }`}>
                          {getStatusSteps(order.status) > step ? "✓" : step}
                        </div>
                        <p className="text-xs text-gray-600 mt-2 text-center">
                          {step === 1 ? "Pending" : step === 2 ? "Processing" : step === 3 ? "Shipped" : "Delivered"}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="w-full h-1 bg-gray-300 rounded-full mt-4">
                    <div
                      className="h-1 bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${(getStatusSteps(order.status) / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-6 border-b">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FiPackage size={20} className="text-blue-600" />
                    Order Items
                  </h4>
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="px-6 py-6 border-b bg-gray-50">
                  <div className="space-y-2 max-w-xs ml-auto">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-medium">₹{(order.subtotal || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax</span>
                      <span className="font-medium">₹{(order.tax || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="font-medium">₹{(order.shipping || 0).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{order.total?.toFixed(2) || "0.00"}</span>
                    </div>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="px-6 py-4 bg-white flex items-center justify-between gap-4 flex-wrap">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowDetails(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition"
                  >
                    <FiEye size={18} />
                    View Details
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 font-medium rounded-lg hover:bg-green-100 transition">
                    <FiDownload size={18} />
                    Download Invoice
                  </button>
                  {order.status !== "delivered" && order.status !== "cancelled" && (
                    <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                      <FiTruck size={18} />
                      Track Package
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-2xl hover:opacity-80 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Order Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono font-semibold text-gray-900">{selectedOrder._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold capitalize text-gray-900">{selectedOrder.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-semibold text-green-600">₹{selectedOrder.total?.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {selectedOrder.shippingAddress && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">{selectedOrder.shippingAddress.fullName}</p>
                    <p className="text-gray-700">{selectedOrder.shippingAddress.street}</p>
                    <p className="text-gray-700">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                    <p className="text-gray-700">{selectedOrder.shippingAddress.zipCode}</p>
                    <p className="text-gray-600 mt-2">📞 {selectedOrder.shippingAddress.phone}</p>
                  </div>
                </div>
              )}

              {/* Items Summary */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
