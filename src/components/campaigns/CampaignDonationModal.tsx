import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaymentMethods } from "@/components/donation/PaymentMethods";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Campaign } from "@/types/campaign";

interface CampaignDonationModalProps {
  campaign: Campaign;
  isOpen: boolean;
  onClose: () => void;
  onDonationComplete: () => void;
}

export const CampaignDonationModal = ({
  campaign,
  isOpen,
  onClose,
  onDonationComplete,
}: CampaignDonationModalProps) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDonation = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Processing donation for campaign:", campaign.id);
      const newAmount = campaign.raised + Number(amount);
      
      const { data, error } = await supabase
        .from("campaigns")
        .update({ raised: newAmount })
        .eq("id", campaign.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating campaign:", error);
        throw error;
      }

      console.log("Updated campaign data:", data);

      toast({
        title: "Thank you for your donation!",
        description: `You have successfully donated $${amount} to ${campaign.name}`,
      });
      
      onDonationComplete();
      onClose();
    } catch (error) {
      console.error("Error processing donation:", error);
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A2235] border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Donate to {campaign.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Donation Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-gray-800 border-gray-700 text-white font-semibold"
            />
          </div>

          <PaymentMethods
            selectedMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
          />

          <Button 
            onClick={handleDonation} 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Processing..." : "Complete Donation"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};