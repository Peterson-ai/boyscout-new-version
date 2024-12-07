import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { ProfileForm } from "@/components/ProfileForm";
import { AccountInfo } from "@/components/AccountInfo";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { profile, isLoading, updateProfile } = useProfile(user);

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and profile information.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-6 border rounded-lg bg-card">
          {profile && (
            <ProfileForm
              initialData={profile}
              onSubmit={updateProfile}
              isLoading={isLoading}
              onCancel={() => navigate(-1)}
            />
          )}
        </div>

        <AccountInfo user={user} />
      </div>
    </div>
  );
};

export default Profile;