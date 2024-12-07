import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute: Checking auth state', { user, loading });

  if (loading) {
    console.log('ProtectedRoute: Still loading...');
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('ProtectedRoute: No user found, redirecting to login');
    return <Navigate to="/login" />;
  }

  console.log('ProtectedRoute: User authenticated, rendering children');
  return <>{children}</>;
};