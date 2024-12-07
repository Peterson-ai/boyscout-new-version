import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Campaign } from "@/types/campaign";
import { CampaignDonationModal } from "./CampaignDonationModal";
import { useQueryClient } from "@tanstack/react-query";

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard = ({ campaign }: CampaignCardProps) => {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const queryClient = useQueryClient();

  const calculateProgress = (raised: number, goal: number) => {
    return Math.min(((raised || 0) / goal) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500';
      case 'upcoming':
        return 'bg-amber-500/10 text-amber-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const handleDonationComplete = () => {
    queryClient.invalidateQueries({ queryKey: ["campaigns"] });
  };

  const progress = calculateProgress(campaign.raised, campaign.goal);
  const displayStatus = progress >= 100 ? 'completed' : campaign.status;

  return (
    <>
      <Card className="bg-[#1A2235] border-gray-800 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{campaign.name}</h2>
            <Badge 
              className={`${getStatusColor(displayStatus)} border-0`}
              variant="outline"
            >
              {displayStatus}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-gray-400">
              {format(new Date(campaign.start_date), 'MMM dd, yyyy')} - {format(new Date(campaign.end_date), 'MMM dd, yyyy')}
            </div>

            <div>
              <div className="mb-2">
                <div className="text-xs text-gray-400 mb-1">
                  {progress.toFixed(1)}% Complete
                </div>
                <Progress 
                  value={progress} 
                  className="h-2 bg-gray-700"
                  indicatorClassName="bg-emerald-500"
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Goal: {formatCurrency(campaign.goal)}</span>
                <span className="text-gray-400">Raised: {formatCurrency(campaign.raised)}</span>
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={() => setShowDonationModal(true)}
            >
              Donate Now
            </Button>
          </div>
        </div>
      </Card>

      <CampaignDonationModal
        campaign={campaign}
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        onDonationComplete={handleDonationComplete}
      />
    </>
  );
};

export default CampaignCard;