import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if user exists and has admin role
  if (!user || user.user_metadata.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};