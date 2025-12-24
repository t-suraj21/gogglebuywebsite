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

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/Orders";
import AdminUsers from "./pages/Admin/Users";
import EditHome from "./pages/Admin/EditHome";
import EditLinks from "./pages/Admin/EditLinks";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";
import AuthInitializer from "./components/AuthInitializer";

export default function App() {
  useEffect(() => {
    // Smooth scroll to top on route change
    window.addEventListener('routechange', () => {
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <AuthInitializer>
      <Routes>
        {/* Splash / Landing */}
        <Route path="/" element={<SplashScreen />} />

      {/* Home */}
      <Route path="/home" element={<PageTransition><Home /></PageTransition>} />

      {/* Auth */}
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

      {/* User - Protected Routes */}
      <Route path="/cart" element={<PageTransition><ProtectedRoute><Cart /></ProtectedRoute></PageTransition>} />
      <Route path="/checkout" element={<PageTransition><ProtectedRoute><Checkout /></ProtectedRoute></PageTransition>} />
      <Route path="/profile" element={<PageTransition><ProtectedRoute><Profile /></ProtectedRoute></PageTransition>} />
      <Route path="/orders" element={<PageTransition><ProtectedRoute><Orders /></ProtectedRoute></PageTransition>} />

      {/* Categories - Protected Routes */}
      <Route path="/deals" element={<PageTransition><ProtectedRoute><Deals /></ProtectedRoute></PageTransition>} />
      <Route path="/eyeglasses" element={<PageTransition><ProtectedRoute><Eyeglasses /></ProtectedRoute></PageTransition>} />
      <Route path="/computer-glasses" element={<PageTransition><ProtectedRoute><ComputerGlasses /></ProtectedRoute></PageTransition>} />
      <Route path="/kids-glasses" element={<PageTransition><ProtectedRoute><KidsGlasses /></ProtectedRoute></PageTransition>} />
      <Route path="/half-rim-frames" element={<PageTransition><ProtectedRoute><HalfRimFrames /></ProtectedRoute></PageTransition>} />
      <Route path="/rimless-frames" element={<PageTransition><ProtectedRoute><RimlessFrames /></ProtectedRoute></PageTransition>} />
      <Route path="/sunglasses" element={<PageTransition><ProtectedRoute><Sunglasses /></ProtectedRoute></PageTransition>} />
      <Route path="/contact-lenses" element={<PageTransition><ProtectedRoute><ContactLenses /></ProtectedRoute></PageTransition>} />

      {/* Admin */}
      <Route path="/admin/edit-home" element={<PageTransition><ProtectedRoute><EditHome /></ProtectedRoute></PageTransition>} />
      <Route path="/admin/edit-links" element={<PageTransition><ProtectedRoute><EditLinks /></ProtectedRoute></PageTransition>} />
      <Route path="/admin" element={<PageTransition><ProtectedRoute><AdminDashboard /></ProtectedRoute></PageTransition>} />
      <Route path="/admin/products" element={<PageTransition><ProtectedRoute><AdminProducts /></ProtectedRoute></PageTransition>} />
      <Route path="/admin/orders" element={<PageTransition><ProtectedRoute><AdminOrders /></ProtectedRoute></PageTransition>} />
      <Route path="/admin/users" element={<PageTransition><ProtectedRoute><AdminUsers /></ProtectedRoute></PageTransition>} />

      {/* 404 - Not Found */}
      <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AuthInitializer>
  );
}
