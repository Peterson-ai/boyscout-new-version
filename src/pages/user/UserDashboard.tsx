import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Heart, Award, Calendar } from "lucide-react";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { DonationStats } from "@/components/dashboard/DonationStats";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { Event } from "@/types/event";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile(user);

  // Fetch active campaigns
  const { data: activeCampaigns } = useQuery({
    queryKey: ['campaigns', 'active'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch user's registered events
  const { data: userEvents } = useQuery<Event[]>({
    queryKey: ['events', 'registered', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          events (*)
        `)
        .eq('user_id', user?.id);
      
      if (error) throw error;
      return data?.map(reg => (reg.events as unknown) as Event) || [];
    },
    enabled: !!user?.id,
  });

  // Get random upcoming event
  const getRandomEvent = () => {
    if (!userEvents || userEvents.length === 0) return null;
    const validEvents = userEvents.filter(event => 
      event && new Date(event.startDate) >= new Date()
    );
    return validEvents.length > 0 
      ? validEvents[Math.floor(Math.random() * validEvents.length)]
      : null;
  };

  const randomEvent = getRandomEvent();

  if (!user) {
    console.log('UserDashboard: No user found, should redirect');
    return null;
  }

  const displayName = profile ? profile.first_name || user?.email?.split('@')[0] : "Guest";

  // Fetch total donations for impact calculations
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

  // Calculate total donations
  const totalDonorDonations = donorDonations?.reduce((sum, donation) => sum + (donation.donation_amount || 0), 0) || 0;
  const totalCampaignDonations = campaignDonations?.reduce((sum, donation) => sum + (donation.amount || 0), 0) || 0;
  const totalDonations = totalDonorDonations + totalCampaignDonations;

  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
        <h1 className="text-2xl font-bold">Welcome, {displayName}</h1>
        <Button 
          variant="secondary"
          onClick={() => navigate("/donate")}
          className="bg-[#6366F1] hover:bg-[#5355E8] text-white w-full md:w-auto"
        >
          Make a Donation
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DonationStats />

        {/* Active Campaigns Card */}
        <div className="bg-[#1A2235] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Active Campaigns</h3>
            <Heart className="text-[#6366F1] h-5 w-5" />
          </div>
          <p className="text-2xl font-bold">{activeCampaigns?.length || 0}</p>
          <p className="text-sm text-gray-400">Campaigns you can support</p>
        </div>

        {/* Merit Badges Card */}
        <div className="bg-[#1A2235] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Merit Badges</h3>
            <Award className="text-[#6366F1] h-5 w-5" />
          </div>
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-gray-400">Badges in progress</p>
        </div>

        {/* Next Event Card */}
        <div className="bg-[#1A2235] p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Next Event</h3>
            <Calendar className="text-[#6366F1] h-5 w-5" />
          </div>
          {randomEvent ? (
            <>
              <p className="text-xl font-bold">{randomEvent.title}</p>
              <p className="text-sm text-gray-400">
                {format(new Date(randomEvent.startDate), 'MMM dd, yyyy')}
              </p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold">No Events</p>
              <p className="text-sm text-gray-400">Register for an event</p>
            </>
          )}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="mb-8">
        <UpcomingEvents />
      </div>

      {/* Your Impact Section */}
      <div className="bg-[#1A2235] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
        <p className="text-gray-400 mb-6">
          Your contributions have helped:
        </p>
        
        <div className="space-y-4">
          <div className="bg-[#1E2943] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Scouts Supported</span>
              <span className="font-bold">{Math.floor(totalDonations / 100)}</span>
            </div>
          </div>
          <div className="bg-[#1E2943] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Camping Trips Funded</span>
              <span className="font-bold">{Math.floor(totalDonations / 500)}</span>
            </div>
          </div>
          <div className="bg-[#1E2943] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Merit Badges Enabled</span>
              <span className="font-bold">{Math.floor(totalDonations / 50)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
