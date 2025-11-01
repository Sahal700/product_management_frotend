import { Navigate, Outlet, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export default function RequireAuth() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/staff/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
