import { Navigate } from "react-router-dom";

// TODO: Replace with actual role check from auth context
const getUserRole = () => {
  // This should come from auth context or API
  return localStorage.getItem("userRole") || "staff";
};

export default function RequireRole({ children, role }) {
  const userRole = getUserRole();

  if (userRole !== role) {
    // Redirect to appropriate dashboard based on role
    const redirectTo = userRole === "staff" ? "/staff" : "/student";
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
