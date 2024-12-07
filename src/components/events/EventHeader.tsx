import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";

interface EventHeaderProps {
  title: string;
  type: Event['type'];
}

export const EventHeader = ({ title, type }: EventHeaderProps) => (
  <div className="flex justify-between items-start mb-4">
    <h3 className="text-xl font-semibold">{title}</h3>
    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-0">
      {type}
    </Badge>
  </div>
);