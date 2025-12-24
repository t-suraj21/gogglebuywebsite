import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
  totalDiscount: 0,
  tax: 0,
  shipping: 0,
  subtotal: 0
};

const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.price || 0;
    const itemDiscount = item.discount || 0;
    const discountedPrice = itemPrice * (1 - itemDiscount / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);

  const totalDiscount = items.reduce((sum, item) => {
    const itemPrice = item.price || 0;
    const itemDiscount = item.discount || 0;
    const discountAmount = (itemPrice * itemDiscount / 100) * item.quantity;
    return sum + discountAmount;
  }, 0);

  const tax = parseFloat((subtotal * 0.1).toFixed(2)); // 10% tax
  const shipping = subtotal > 500 ? 0 : 100; // Free shipping over ₹500
  const totalPrice = parseFloat((subtotal + tax + shipping).toFixed(2));

  return { totalItems, subtotal, totalDiscount, tax, shipping, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        state.items.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount || 0,
          image: product.image,
          brand: product.brand,
          quantity: product.quantity || 1
        });
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.subtotal = totals.subtotal;
      state.totalDiscount = totals.totalDiscount;
      state.tax = totals.tax;
      state.shipping = totals.shipping;
      state.totalPrice = totals.totalPrice;
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.subtotal = totals.subtotal;
      state.totalDiscount = totals.totalDiscount;
      state.tax = totals.tax;
      state.shipping = totals.shipping;
      state.totalPrice = totals.totalPrice;
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item._id === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item._id !== productId);
        } else {
          item.quantity = quantity;
        }
      }

      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.subtotal = totals.subtotal;
      state.totalDiscount = totals.totalDiscount;
      state.tax = totals.tax;
      state.shipping = totals.shipping;
      state.totalPrice = totals.totalPrice;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.totalDiscount = 0;
      state.tax = 0;
      state.shipping = 0;
      state.totalPrice = 0;
    },

    updateShipping: (state, action) => {
      state.shipping = action.payload;
      const totals = calculateTotals(state.items);
      state.totalPrice = parseFloat((totals.subtotal + totals.tax + state.shipping).toFixed(2));
    },

    applyCoupon: (state, action) => {
      const discountPercentage = action.payload;
      state.totalDiscount = parseFloat((state.subtotal * discountPercentage / 100).toFixed(2));
      const discountedSubtotal = state.subtotal - state.totalDiscount;
      state.tax = parseFloat((discountedSubtotal * 0.1).toFixed(2));
      state.totalPrice = parseFloat((discountedSubtotal + state.tax + state.shipping).toFixed(2));
    },

    restoreCart: (state, action) => {
      const { items, totalItems, totalPrice } = action.payload;
      state.items = items || [];
      state.totalItems = totalItems || 0;
      state.totalPrice = totalPrice || 0;
      
      if (state.items.length > 0) {
        const totals = calculateTotals(state.items);
        state.subtotal = totals.subtotal;
        state.totalDiscount = totals.totalDiscount;
        state.tax = totals.tax;
        state.shipping = totals.shipping;
      }
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateShipping,
  applyCoupon,
  restoreCart
} = cartSlice.actions;

export default cartSlice.reducer;
