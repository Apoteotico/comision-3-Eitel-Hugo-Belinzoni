import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const ProtectedRoute = () => {
  const {loading,  isAuthenticated} = useAuth();
  
  console.log(loading, isAuthenticated, "linea7 Proute")

  /* if (loading) return <h1>Loading...</h1>; */
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};
