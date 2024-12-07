import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";

interface EventProgressProps {
  currentRegistrations: number;
  maxRegistrations: number;
}

export const EventProgress = ({ currentRegistrations, maxRegistrations }: EventProgressProps) => {
  // Ensure we have valid numbers and calculate the percentage
  const safeCurrentRegistrations = Number(currentRegistrations) || 0;
  const safeMaxRegistrations = Number(maxRegistrations) || 1; // Prevent division by zero
  const progress = Math.min((safeCurrentRegistrations / safeMaxRegistrations) * 100, 100);

  return (
    <>
      <div className="flex items-center text-gray-400 mb-2">
        <Users className="w-4 h-4 mr-2" />
        <span>{safeCurrentRegistrations} / {safeMaxRegistrations} registered</span>
      </div>
      
      <Progress 
        value={progress} 
        className="h-2"
        indicatorClassName="bg-blue-500"
      />
    </>
  );
};