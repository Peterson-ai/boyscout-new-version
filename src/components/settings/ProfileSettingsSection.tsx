import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const ProfileSettingsSection = () => {
  const { user } = useAuth();
  const { profile, updateProfile, isLoading } = useProfile(user);
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    organization: profile?.organization || '',
    phone: profile?.phone || '',
    city: profile?.city || '',
    state: profile?.state || '',
    zip: profile?.zip || ''
  });

  const isProfileIncomplete = !profile?.first_name || !profile?.last_name || !profile?.city || !profile?.state || !profile?.zip;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <Card className="p-6 bg-[#0D1425] border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-[#6366F1]" />
        <h2 className="text-lg font-medium text-white">Profile Settings</h2>
      </div>

      {isProfileIncomplete && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-500">
            Please complete your profile information to access the dashboard.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">First Name *</label>
            <Input 
              name="first_name"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Last Name *</label>
            <Input 
              name="last_name"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Organization</label>
            <Input 
              name="organization"
              placeholder="Enter your organization"
              value={formData.organization}
              onChange={handleChange}
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <Input 
              type="email"
              value={user?.email || ''}
              readOnly
              className="bg-[#1A2235] border-gray-700 text-white opacity-50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Phone Number</label>
            <Input 
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">City *</label>
            <Input 
              name="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={handleChange}
              required
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">State *</label>
            <Input 
              name="state"
              placeholder="Enter your state"
              value={formData.state}
              onChange={handleChange}
              required
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">ZIP Code *</label>
            <Input 
              name="zip"
              placeholder="Enter your ZIP code"
              value={formData.zip}
              onChange={handleChange}
              required
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="mt-6">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full md:w-auto bg-[#6366F1] hover:bg-[#5558DD]"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Card>
  );
};