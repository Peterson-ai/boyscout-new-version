import { Button } from "@/components/ui/button";
import { ProfileSettingsSection } from "@/components/settings/ProfileSettingsSection";
import { NotificationSettingsSection } from "@/components/settings/NotificationSettingsSection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";
import { toast } from "sonner";

const Settings = () => {
  const handleSaveChanges = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>

      <div className="space-y-6">
        <ProfileSettingsSection />
        <NotificationSettingsSection />
        <PreferencesSection />
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSaveChanges}
          className="bg-[#6366F1] hover:bg-[#5558DD]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;