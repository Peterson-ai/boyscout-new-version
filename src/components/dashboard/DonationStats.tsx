import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { DollarSign } from "lucide-react";

export const DonationStats = () => {
  const { user } = useAuth();

  // Fetch user's donations from donors table
  const { data: donorDonations } = useQuery({
    queryKey: ['donor-donations', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donors')
        .select('donation_amount')
        .eq('user_id', user?.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Fetch user's donations from campaigns
  const { data: campaignDonations } = useQuery({
    queryKey: ['campaign-donations', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donations')
        .select('amount')
        .eq('donor_id', user?.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  // Calculate total donations from both sources
  const totalDonorDonations = donorDonations?.reduce((sum, donation) => sum + (donation.donation_amount || 0), 0) || 0;
  const totalCampaignDonations = campaignDonations?.reduce((sum, donation) => sum + (donation.amount || 0), 0) || 0;
  const totalDonations = totalDonorDonations + totalCampaignDonations;

  return (
    <div className="bg-[#1A2235] p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400">Total Donations</h3>
        <DollarSign className="text-[#6366F1] h-5 w-5" />
      </div>
      <p className="text-2xl font-bold">${totalDonations.toFixed(2)}</p>
      <p className="text-sm text-gray-400">Your lifetime contributions</p>
    </div>
  );
};