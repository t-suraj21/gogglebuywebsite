import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { clearCart } from "../redux/cartSlice";
import { FiArrowLeft, FiCheck, FiTruck, FiCreditCard, FiLock } from "react-icons/fi";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items || []);
  const user = useSelector((state) => state.auth.user);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shippingData, setShippingData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });

  const [billingData, setBillingData] = useState({
    sameAsShipping: true,
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [paymentData, setPaymentData] = useState({
    method: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateShipping = () => {
    return (
      shippingData.fullName &&
      shippingData.email &&
      shippingData.phone &&
      shippingData.street &&
      shippingData.city &&
      shippingData.state &&
      shippingData.zipCode
    );
  };

  const validatePayment = () => {
    return (
      paymentData.method &&
      paymentData.cardNumber?.length >= 13 &&
      paymentData.cardName &&
      paymentData.expiryDate &&
      paymentData.cvv?.length === 3
    );
  };

  const handlePlaceOrder = async () => {
    if (!validateShipping()) {
      alert("Please fill in all shipping details");
      return;
    }

    if (!validatePayment()) {
      alert("Please fill in valid payment details");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items,
        shippingAddress: shippingData,
        billingAddress: billingingSameAsShipping ? shippingData : billingData,
        payment: {
          method: paymentData.method,
          lastFourDigits: paymentData.cardNumber.slice(-4)
        },
        subtotal,
        tax,
        shipping,
        total,
        status: "pending"
      };

      const res = await api.post("/orders", orderData);
      setOrderPlaced(true);
      dispatch(clearCart());
      
      setTimeout(() => {
        navigate(`/orders`);
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to continue checkout</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <FiCheck size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase. You will receive an email confirmation shortly.</p>
          <p className="text-sm text-gray-600">Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 w-full">
        {/* Header */}
        <div className="mb-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/cart")}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition"
          >
            <FiArrowLeft size={20} />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <button
                    onClick={() => currentStep > step && setCurrentStep(step)}
                    className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition ${
                      currentStep >= step
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {currentStep > step ? <FiCheck size={20} /> : step}
                  </button>
                  {step < 3 && (
                    <div
                      className={`h-1 w-12 mx-2 transition ${
                        currentStep > step ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FiTruck size={24} className="text-blue-600" />
                  Shipping Address
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={shippingData.fullName}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={shippingData.email}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={shippingData.phone}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={shippingData.country}
                      disabled
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={shippingData.street}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={shippingData.city}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={shippingData.state}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={shippingData.zipCode}
                      onChange={handleShippingChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    onClick={() => validateShipping() && setCurrentStep(2)}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                  >
                    Continue to Billing
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Billing Address */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Billing Address</h2>

                <label className="flex items-center gap-2 mb-6">
                  <input
                    type="checkbox"
                    checked={billingData.sameAsShipping}
                    onChange={(e) => setBillingData((prev) => ({ ...prev, sameAsShipping: e.target.checked }))}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-gray-700">Same as shipping address</span>
                </label>

                {!billingData.sameAsShipping && (
                  <div className="space-y-4 mb-6">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={billingData.fullName}
                      onChange={(e) => setBillingData((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Add more billing fields as needed */}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FiCreditCard size={24} className="text-blue-600" />
                  Payment Information
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 flex-1">
                      <input
                        type="radio"
                        name="method"
                        value="card"
                        checked={paymentData.method === "card"}
                        onChange={handlePaymentChange}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-700">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center gap-2 flex-1">
                      <input
                        type="radio"
                        name="method"
                        value="upi"
                        checked={paymentData.method === "upi"}
                        onChange={handlePaymentChange}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-700">UPI</span>
                    </label>
                  </div>
                </div>

                {paymentData.method === "card" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={paymentData.cardNumber}
                      onChange={handlePaymentChange}
                      maxLength="16"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={paymentData.cardName}
                      onChange={handlePaymentChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={handlePaymentChange}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={paymentData.cvv}
                        onChange={handlePaymentChange}
                        maxLength="3"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <FiLock size={18} />
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.name} x {item.quantity}</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 border-t pt-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
