import { MapPin } from "lucide-react";

interface EventLocationProps {
  location: string;
}

export const EventLocation = ({ location }: EventLocationProps) => (
  <div className="flex items-center text-gray-400">
    <MapPin className="w-4 h-4 mr-2" />
    {location}
  </div>
);