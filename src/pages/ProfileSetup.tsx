import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/ProfileForm";
import { toast } from "sonner";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { updateProfile, isLoading } = useProfile(user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await updateProfile(data);
      toast.success("Profile setup completed!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to set up profile");
      console.error("Profile setup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-gray-400">
            Please provide your information to complete your profile setup
          </p>
        </div>

        <div className="bg-[#0D1425] border border-gray-800 rounded-lg p-6">
          <ProfileForm
            initialData={{
              first_name: "",
              last_name: "",
              phone: "",
              organization: "",
              city: "",
              state: "",
              zip: "",
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading || isSubmitting}
            onCancel={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;