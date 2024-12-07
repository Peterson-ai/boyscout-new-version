import { AdminRoute } from "@/components/AdminRoute";
import AppLayout from "@/components/layout/AppLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import DonorList from "@/pages/donors/DonorList";
import Analytics from "@/pages/Analytics";
import DonorAnalytics from "@/pages/donors/DonorAnalytics";

export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AppLayout>
          <AdminDashboard />
        </AppLayout>
      </AdminRoute>
    )
  },
  {
    path: "/admin/donors",
    element: (
      <AdminRoute>
        <AppLayout>
          <DonorList />
        </AppLayout>
      </AdminRoute>
    )
  },
  {
    path: "/admin/analytics",
    element: (
      <AdminRoute>
        <AppLayout>
          <Analytics />
        </AppLayout>
      </AdminRoute>
    )
  },
  {
    path: "/admin/donor-analytics",
    element: (
      <AdminRoute>
        <AppLayout>
          <DonorAnalytics />
        </AppLayout>
      </AdminRoute>
    )
  }
];