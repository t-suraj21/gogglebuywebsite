import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items || []);
  const [addressDetails, setAddressDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId: itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleClearCart = () => {
    items.forEach(item => {
      dispatch(removeFromCart(item._id));
    });
  };

  const handleBackToShop = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!addressDetails.fullName || !addressDetails.phone || !addressDetails.address || !addressDetails.city || !addressDetails.state || !addressDetails.postalCode || !addressDetails.country) {
      alert('Please fill in all address details!');
      return;
    }
    navigate('/checkout', { state: { items, total, subtotal, tax, shipping, addressDetails } });
  };

  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={handleBackToShop}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-4 transition"
          >
            <FiArrowLeft size={20} />
            Back to Shop
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Your Shopping Cart</h1>
          {items.length === 0 && (
            <p className="text-gray-600 mt-2">Your cart is empty. <button onClick={handleBackToShop} className="text-blue-600 hover:underline">Continue shopping</button></p>
          )}
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item._id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition cursor-pointer mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">{item.brand || 'Premium Collection'}</p>
                            <p className="text-xs text-gray-400">Ref: {String(item._id).toUpperCase()}0123456</p>
                          </div>
                          
                          {/* Quantity Control */}
                          <div className="flex items-center gap-3 mt-4">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition"
                            >
                              <FiMinus size={16} className="text-gray-700" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1)}
                              className="w-16 text-center border-2 border-gray-200 rounded-lg py-1 focus:outline-none focus:border-blue-500 font-semibold text-gray-900"
                            />
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition"
                            >
                              <FiPlus size={16} className="text-gray-700" />
                            </button>
                          </div>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex flex-col items-end justify-between">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              ₹{item.price.toFixed(2)} each
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition flex items-center gap-1.5 mt-2"
                          >
                            <FiTrash2 size={18} />
                            <span className="text-sm font-medium">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 rounded-b-2xl">
                  <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-600 font-medium text-sm transition flex items-center gap-2"
                  >
                    <FiTrash2 size={16} />
                    Clear All Items
                  </button>
                </div>
              </div>
            </div>

            {/* Card Details - Right Side */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 text-white sticky top-20">
                <h2 className="text-2xl font-bold mb-8 text-yellow-400">Card Details</h2>

                {/* Order Summary */}
                <div className="space-y-4 mb-8 pb-8 border-b border-gray-700">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-white">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (10%):</span>
                    <span className="font-semibold text-white">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping:</span>
                    <span className={`font-semibold ${shipping === 0 ? 'text-green-400' : 'text-white'}`}>
                      {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-yellow-400 text-lg font-bold pt-4 border-t border-gray-600">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Address Details Section */}
                <div className="mb-8 pb-8 border-b border-gray-700">
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">Delivery Address</h3>
                  
                  {/* Full Name and Phone */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        value={addressDetails.fullName}
                        onChange={handleAddressInputChange}
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 9876543210"
                        value={addressDetails.phone}
                        onChange={handleAddressInputChange}
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Main Street, Apt 4B"
                      value={addressDetails.address}
                      onChange={handleAddressInputChange}
                      className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                    />
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Mumbai"
                        value={addressDetails.city}
                        onChange={handleAddressInputChange}
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Maharashtra"
                        value={addressDetails.state}
                        onChange={handleAddressInputChange}
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                      />
                    </div>
                  </div>

                  {/* Postal Code and Country */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="400001"
                        value={addressDetails.postalCode}
                        onChange={handleAddressInputChange}
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        placeholder="India"
                        value={addressDetails.country}
                        onChange={handleAddressInputChange}
                        className="w-full bg-gray-700 border-2 border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-4 rounded-xl transition shadow-lg transform hover:scale-105 text-lg"
                >
                  Checkout (₹{total.toFixed(2)})
                </button>

                {/* Continue Shopping Link */}
                <button 
                  onClick={handleContinueShopping}
                  className="block w-full text-center text-gray-400 hover:text-white font-medium py-3 mt-4 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some eyewear to your cart and come back here!</p>
            <button 
              onClick={handleBackToShop}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}