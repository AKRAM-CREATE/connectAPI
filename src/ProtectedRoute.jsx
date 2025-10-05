import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  console.log("token ", token);
  if (!token || token === null) {
    // Not logged in → go to login page
    console.log("redirected");
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the page
  return children;
}
