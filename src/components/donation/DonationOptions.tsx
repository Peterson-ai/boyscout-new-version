import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface DonationOption {
  amount: number;
  label: string;
  description: string;
  type: string;
  matchPercentage: number;
}

interface DonationOptionsProps {
  options: DonationOption[];
  selectedAmount: number | null;
  onSelectAmount: (amount: number) => void;
}

export const DonationOptions = ({ options, selectedAmount, onSelectAmount }: DonationOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {options.map((option) => (
        <button
          key={option.amount}
          onClick={() => onSelectAmount(option.amount)}
          className={`p-4 rounded-lg border ${
            selectedAmount === option.amount
              ? "border-blue-500 bg-blue-500/10"
              : "border-gray-700 hover:border-gray-600 bg-gray-800"
          } text-left transition-all`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-xl font-bold text-white">${option.amount}</span>
            <span className="text-sm text-emerald-400">{option.matchPercentage}% Match</span>
          </div>
          <p className="text-sm text-gray-300 mb-1">{option.description}</p>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Heart size={14} />
            <span>{option.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};