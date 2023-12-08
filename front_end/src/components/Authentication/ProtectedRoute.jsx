import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { hasAccessToken } = useAuth();

  // console.log(isAuthenticated);
  console.log(hasAccessToken());
  return hasAccessToken() ? <Outlet /> : <Navigate to={"/login"} />;
}
