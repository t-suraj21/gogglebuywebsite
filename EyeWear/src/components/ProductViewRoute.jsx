import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showLoginPopup, resetLoginPopup } from "../redux/authSlice";

// Shows page content normally. If not logged in, shows non-blocking login popup
export default function ProductViewRoute({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Show popup if not logged in, reset the dismissed flag when navigating to a new product page
    if (!isAuthenticated) {
      dispatch(resetLoginPopup());
      dispatch(showLoginPopup());
    }
  }, []); // Run once on mount

  // Always render the page content - popup is non-blocking
  return children;
}
