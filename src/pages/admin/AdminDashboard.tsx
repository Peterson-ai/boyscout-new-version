import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Donor Management</h2>
          <Button 
            className="w-full"
            onClick={() => navigate("/admin/donors")}
          >
            View Donor List
          </Button>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <Button 
            className="w-full"
            onClick={() => navigate("/admin/analytics")}
          >
            View Analytics
          </Button>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Donor Analytics</h2>
          <Button 
            className="w-full"
            onClick={() => navigate("/admin/donor-analytics")}
          >
            View Donor Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;