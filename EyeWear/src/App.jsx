import { Routes, Route, Navigate } from "react-router-dom";

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

export default function App() {
  return (
    <Routes>
      {/* Splash / Landing */}
      <Route path="/" element={<SplashScreen />} />

      {/* Home */}
      <Route path="/home" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User - Protected Routes */}
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />

      {/* Categories - Protected Routes */}
      <Route path="/deals" element={<ProtectedRoute><Deals /></ProtectedRoute>} />
      <Route path="/eyeglasses" element={<ProtectedRoute><Eyeglasses /></ProtectedRoute>} />
      <Route path="/computer-glasses" element={<ProtectedRoute><ComputerGlasses /></ProtectedRoute>} />
      <Route path="/kids-glasses" element={<ProtectedRoute><KidsGlasses /></ProtectedRoute>} />
      <Route path="/half-rim-frames" element={<ProtectedRoute><HalfRimFrames /></ProtectedRoute>} />
      <Route path="/rimless-frames" element={<ProtectedRoute><RimlessFrames /></ProtectedRoute>} />
      <Route path="/sunglasses" element={<ProtectedRoute><Sunglasses /></ProtectedRoute>} />
      <Route path="/contact-lenses" element={<ProtectedRoute><ContactLenses /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/edit-home" element={<ProtectedRoute><EditHome /></ProtectedRoute>} />
      <Route path="/admin/edit-links" element={<ProtectedRoute><EditLinks /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />

      {/* 404 - Not Found */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
