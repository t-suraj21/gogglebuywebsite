import { useState } from "react";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(!user);

  if (!user) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => window.history.back()}
          onLoginSuccess={() => {
            setShowAuthModal(false);
          }}
        />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please login to continue</p>
          </div>
        </div>
      </>
    );
  }

  return children;
}
