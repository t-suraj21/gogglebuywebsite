import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

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

import ProductViewRoute from "./components/ProductViewRoute";

import AuthModal from "./components/AuthModal";
import PageTransition from "./components/PageTransition";
import AuthInitializer from "./components/AuthInitializer";

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
      <Route path="/cart" element={<PageTransition><ProductViewRoute><Cart /></ProductViewRoute></PageTransition>} />
      <Route path="/checkout" element={<PageTransition><ProductViewRoute><Checkout /></ProductViewRoute></PageTransition>} />
      <Route path="/profile" element={<PageTransition><ProductViewRoute><Profile /></ProductViewRoute></PageTransition>} />
      <Route path="/orders" element={<PageTransition><ProductViewRoute><Orders /></ProductViewRoute></PageTransition>} />


      {/* Product View Pages - allow view after popup dismissed */}
      <Route path="/deals" element={<PageTransition><ProductViewRoute><Deals /></ProductViewRoute></PageTransition>} />
      <Route path="/eyeglasses" element={<PageTransition><ProductViewRoute><Eyeglasses /></ProductViewRoute></PageTransition>} />
      <Route path="/computer-glasses" element={<PageTransition><ProductViewRoute><ComputerGlasses /></ProductViewRoute></PageTransition>} />
      <Route path="/kids-glasses" element={<PageTransition><ProductViewRoute><KidsGlasses /></ProductViewRoute></PageTransition>} />
      <Route path="/half-rim-frames" element={<PageTransition><ProductViewRoute><HalfRimFrames /></ProductViewRoute></PageTransition>} />
      <Route path="/rimless-frames" element={<PageTransition><ProductViewRoute><RimlessFrames /></ProductViewRoute></PageTransition>} />
      <Route path="/sunglasses" element={<PageTransition><ProductViewRoute><Sunglasses /></ProductViewRoute></PageTransition>} />
      <Route path="/contact-lenses" element={<PageTransition><ProductViewRoute><ContactLenses /></ProductViewRoute></PageTransition>} />

      {/* Wear Categories - also product view */}
      <Route path="/male-wear" element={<PageTransition><ProductViewRoute><MenWear /></ProductViewRoute></PageTransition>} />
      <Route path="/female-wear" element={<PageTransition><ProductViewRoute><FemaleWear /></ProductViewRoute></PageTransition>} />
      <Route path="/child-wear" element={<PageTransition><ProductViewRoute><ChildWear /></ProductViewRoute></PageTransition>} />

      {/* Admin - Now accessible without login */}
      <Route path="/admin/edit-home" element={<PageTransition><ProductViewRoute><EditHome /></ProductViewRoute></PageTransition>} />
      <Route path="/admin/edit-links" element={<PageTransition><ProductViewRoute><EditLinks /></ProductViewRoute></PageTransition>} />
      <Route path="/admin/dashboard" element={<PageTransition><ProductViewRoute><AdminDashboard /></ProductViewRoute></PageTransition>} />
      <Route path="/admin/products" element={<PageTransition><ProductViewRoute><AdminProducts /></ProductViewRoute></PageTransition>} />
      <Route path="/admin/orders" element={<PageTransition><ProductViewRoute><AdminOrders /></ProductViewRoute></PageTransition>} />
      <Route path="/admin/users" element={<PageTransition><ProductViewRoute><AdminUsers /></ProductViewRoute></PageTransition>} />

      {/* 404 - Not Found */}
      <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthInitializer>
  );
}
