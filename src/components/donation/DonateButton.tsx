import { Button } from "@/components/ui/button";

interface DonateButtonProps {
  amount: number | null;
  isSubmitting: boolean;
  onClick: (e: React.FormEvent) => void;
}

export const DonateButton = ({ amount, isSubmitting, onClick }: DonateButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white"
      size="lg"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Processing..." : `Donate${amount ? ` $${amount}` : ""}`}
    </Button>
  );
};