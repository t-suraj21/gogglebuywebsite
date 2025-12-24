import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [showAuthModal, setShowAuthModal] = useState(!user);
  const [showContent, setShowContent] = useState(!!user);

  useEffect(() => {
    setShowAuthModal(!user);
    setShowContent(!!user);
  }, [user]);

  if (!user) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false);
            // Allow page to load even if modal is closed
            setShowContent(true);
          }}
          onLoginSuccess={() => {
            setShowAuthModal(false);
            setShowContent(true);
          }}
        />
        {/* Show page content behind modal if not logged in */}
        <div className={showContent ? "opacity-50 pointer-events-none" : ""}>
          {children}
        </div>
      </>
    );
  }

  return children;
}
