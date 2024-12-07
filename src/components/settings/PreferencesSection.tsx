import { Settings as SettingsIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PreferencesSection = () => {
  return (
    <Card className="p-6 bg-[#0D1425] border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-5 w-5 text-[#6366F1]" />
        <h2 className="text-lg font-medium text-white">Preferences</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Language</label>
          <Select defaultValue="en">
            <SelectTrigger className="bg-[#1A2235] border-gray-700 text-white">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A2235] border-gray-700">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="dark-mode" className="border-gray-600" defaultChecked />
          <label htmlFor="dark-mode" className="text-gray-300">
            Dark Mode
          </label>
        </div>
      </div>
    </Card>
  );
};