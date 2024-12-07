import { ProtectedRoute } from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import UserDashboard from "@/pages/user/UserDashboard";
import DonationPage from "@/pages/user/DonationPage";
import DonorSubmission from "@/pages/DonorSubmission";
import Profile from "@/pages/Profile";
import CampaignsPage from "@/pages/user/CampaignsPage";
import EventsPage from "@/pages/user/EventsPage";
import Settings from "@/pages/Settings";
import ProfileSetup from "@/pages/ProfileSetup";

export const userRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <UserDashboard />
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/donate",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <DonationPage />
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/donor-submission",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <DonorSubmission />
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <Profile />
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/campaigns",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <CampaignsPage />
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/youth-needs",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <div>Youth Needs Page</div>
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/events",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <EventsPage />
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/merit-badges",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <div>Merit Badges Page</div>
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <Settings />
        </AppLayout>
      </ProtectedRoute>
    )
  },
  {
    path: "/profile-setup",
    element: (
      <ProtectedRoute>
        <ProfileSetup />
      </ProtectedRoute>
    )
  }
];
