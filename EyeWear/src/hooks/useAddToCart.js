import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { useState } from "react";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  const handleAddToCart = (product, redirectToCart = true) => {
    // Check if user is logged in
    if (!user) {
      setPendingProduct(product);
      setShowAuthModal(true);
      return { success: false, reason: "auth" };
    }

    // Add to cart
    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount || 0,
      image: product.images?.[0],
      brand: product.brand,
      quantity: product.quantity || 1
    }));

    // Redirect to cart if specified
    if (redirectToCart) {
      navigate("/cart");
    }

    return { success: true };
  };

  const handleLoginSuccess = (product) => {
    if (pendingProduct) {
      dispatch(addToCart({
        _id: pendingProduct._id,
        name: pendingProduct.name,
        price: pendingProduct.price,
        discount: pendingProduct.discount || 0,
        image: pendingProduct.images?.[0],
        brand: pendingProduct.brand,
        quantity: pendingProduct.quantity || 1
      }));
      navigate("/cart");
    }
    setShowAuthModal(false);
    setPendingProduct(null);
  };

  return {
    handleAddToCart,
    handleLoginSuccess,
    showAuthModal,
    setShowAuthModal,
    pendingProduct
  };
};
