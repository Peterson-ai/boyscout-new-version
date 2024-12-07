import { Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export const NotificationSettingsSection = () => {
  return (
    <Card className="p-6 bg-[#0D1425] border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5 text-[#6366F1]" />
        <h2 className="text-lg font-medium text-white">Notification Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="donation-confirmations" className="border-gray-600" />
          <label htmlFor="donation-confirmations" className="text-gray-300">
            Donation Confirmations
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="platform-updates" className="border-gray-600" />
          <label htmlFor="platform-updates" className="text-gray-300">
            Platform Updates
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="event-notifications" className="border-gray-600" />
          <label htmlFor="event-notifications" className="text-gray-300">
            Event Notifications
          </label>
        </div>
      </div>
    </Card>
  );
};