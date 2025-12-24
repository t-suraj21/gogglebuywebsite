import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/loginUser/fulfilled", "auth/registerUser/fulfilled"],
        ignoredPaths: ["auth.user"]
      }
    }),
  devTools: process.env.NODE_ENV !== "production"
});

// Persist cart to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    "cart",
    JSON.stringify({
      items: state.cart.items,
      totalItems: state.cart.totalItems,
      totalPrice: state.cart.totalPrice
    })
  );
});

// Restore cart from localStorage
const savedCart = localStorage.getItem("cart");
if (savedCart) {
  try {
    const cartData = JSON.parse(savedCart);
    store.dispatch({
      type: "cart/restoreCart",
      payload: cartData
    });
  } catch (error) {
    console.error("Failed to restore cart:", error);
  }
}

export default store;
