import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { generateAppealCode } from "@/utils/donorUtils";
import { DonationForm } from "@/components/donation/DonationForm";

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to make a donation",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCounty) {
      toast({
        title: "County Required",
        description: "Please select a county for your donation",
        variant: "destructive",
      });
      return;
    }

    const finalAmount = selectedAmount || Number(customAmount);
    if (!finalAmount || finalAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please select or enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const currentYear = new Date().getFullYear();
    const appealCode = generateAppealCode("Annual Appeal", currentYear);
    
    try {
      console.log('Creating donor record...');
      // First, create the donor record
      const { data: donorData, error: donorError } = await supabase
        .from('donors')
        .insert({
          user_id: user.id,
          email: user.email,
          donation_amount: finalAmount,
          county: selectedCounty,
          structure: "Individual",
          giving_category: "Regular Donor",
          appeal_code: appealCode,
          appeal_name: "Annual Appeal",
          year: currentYear,
          first_name: user.user_metadata?.first_name || "Anonymous",
          last_org_name: user.email.split('@')[0],
          city: selectedCounty,
          state: "Florida",
          zip: "33101"
        })
        .select()
        .single();

      if (donorError) {
        console.error('Error creating donor:', donorError);
        throw donorError;
      }

      console.log('Donor created:', donorData);

      // Then, create the donation record using the donor ID
      const { error: donationError } = await supabase
        .from('donations')
        .insert({
          donor_id: donorData.id,
          amount: finalAmount,
          frequency: frequency,
          status: 'completed',
          payment_method: paymentMethod,
          metadata: {
            county: selectedCounty,
            appeal_code: appealCode,
            year: currentYear
          }
        });

      if (donationError) {
        console.error('Error creating donation:', donationError);
        throw donationError;
      }
      
      toast({
        title: "Thank you for your donation!",
        description: `Your ${frequency} donation of $${finalAmount} will help support our Scouts in ${selectedCounty}.`,
      });
      
      navigate("/");
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast({
        title: "Error",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  return (
    <div className="container max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Support Our Scouts</h1>
        <p className="text-gray-400">Your generosity helps create opportunities for young Scouts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card className="p-6 bg-gray-900 border-gray-700">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <div className="p-1 bg-blue-500/10 rounded">
                  <Heart size={16} className="text-blue-400" />
                </div>
                <span className="font-medium">Personalized Donation Suggestions</span>
              </div>
              <p className="text-sm text-gray-300">Based on community needs and impact analysis</p>
            </div>

            <DonationForm
              selectedAmount={selectedAmount}
              customAmount={customAmount}
              frequency={frequency}
              paymentMethod={paymentMethod}
              selectedCounty={selectedCounty}
              isSubmitting={isSubmitting}
              onAmountSelect={handleAmountSelect}
              onCustomAmountChange={handleCustomAmountChange}
              onFrequencyChange={setFrequency}
              onPaymentMethodChange={setPaymentMethod}
              onCountyChange={setSelectedCounty}
              onSubmit={handleDonation}
            />
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="p-6 bg-gray-900 border-gray-700">
            <h2 className="font-semibold mb-4 text-white">Your Impact</h2>
            <div className="space-y-4">
              {[
                { label: "Help provide Scout uniforms", icon: "👕" },
                { label: "Support merit badge activities", icon: "🏅" },
                { label: "Contribute to camping equipment", icon: "⛺" },
              ].map((impact, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-300">
                  <span className="text-xl">{impact.icon}</span>
                  <span className="text-sm">{impact.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;