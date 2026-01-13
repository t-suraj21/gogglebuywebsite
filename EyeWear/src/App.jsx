import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Splash / Landing
import SplashScreen from "./splash/SplashScreen";

// User Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

// Category Pages
import Deals from "./pages/Deals";
import Eyeglasses from "./pages/Eyeglasses";
import ComputerGlasses from "./pages/ComputerGlasses";
import KidsGlasses from "./pages/KidsGlasses";
import HalfRimFrames from "./pages/HalfRimFrames";
import RimlessFrames from "./pages/RimlessFrames";
import Sunglasses from "./pages/Sunglasses";
import ContactLenses from "./pages/ContactLenses";

// Wear Category Pages
import MenWear from "./pages/MenWear";
import FemaleWear from "./pages/FemaleWear";
import ChildWear from "./pages/ChildWear";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/Orders";
import AdminUsers from "./pages/Admin/Users";
import EditHome from "./pages/Admin/EditHome";
import EditLinks from "./pages/Admin/EditLinks";

// Protected Route

import PageTransition from "./components/PageTransition";
import AuthInitializer from "./components/AuthInitializer";
import AuthModal from "./components/AuthModal";
import { resetLoginPopup } from "./redux/authSlice";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Show popup on every page change
    dispatch(resetLoginPopup());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    // Smooth scroll to top on route change
    window.addEventListener('routechange', () => {
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <AuthInitializer>
      <AuthModal />
      <Routes>
        {/* Splash / Landing */}
        <Route path="/" element={<SplashScreen />} />

      {/* Home */}
      <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
      {/* Auth */}
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

      {/* User Pages - Now accessible without login */}
      <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
      <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
      <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
      <Route path="/orders" element={<PageTransition><Orders /></PageTransition>} />


      {/* Product View Pages - allow view after popup dismissed */}
      <Route path="/deals" element={<PageTransition><Deals /></PageTransition>} />
      <Route path="/eyeglasses" element={<PageTransition><Eyeglasses /></PageTransition>} />
      <Route path="/computer-glasses" element={<PageTransition><ComputerGlasses /></PageTransition>} />
      <Route path="/kids-glasses" element={<PageTransition><KidsGlasses /></PageTransition>} />
      <Route path="/half-rim-frames" element={<PageTransition><HalfRimFrames /></PageTransition>} />
      <Route path="/rimless-frames" element={<PageTransition><RimlessFrames /></PageTransition>} />
      <Route path="/sunglasses" element={<PageTransition><Sunglasses /></PageTransition>} />
      <Route path="/contact-lenses" element={<PageTransition><ContactLenses /></PageTransition>} />

      {/* Wear Categories - also product view */}
      <Route path="/male-wear" element={<PageTransition><MenWear /></PageTransition>} />
      <Route path="/female-wear" element={<PageTransition><FemaleWear /></PageTransition>} />
      <Route path="/child-wear" element={<PageTransition><ChildWear /></PageTransition>} />

      {/* Admin - Now accessible without login */}
      <Route path="/admin/edit-home" element={<PageTransition><EditHome /></PageTransition>} />
      <Route path="/admin/edit-links" element={<PageTransition><EditLinks /></PageTransition>} />
      <Route path="/admin/dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
      <Route path="/admin/products" element={<PageTransition><AdminProducts /></PageTransition>} />
      <Route path="/admin/orders" element={<PageTransition><AdminOrders /></PageTransition>} />
      <Route path="/admin/users" element={<PageTransition><AdminUsers /></PageTransition>} />

      {/* 404 - Not Found */}
      <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthInitializer>
  );
}
