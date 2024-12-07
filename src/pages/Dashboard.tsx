import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { getDonors } from "@/lib/donors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile(user);

  const { data: donations, isLoading } = useQuery({
    queryKey: ['donors', user?.id],
    queryFn: getDonors,
    enabled: !!user?.id,
  });

  const displayName = profile ? profile.first_name || user?.email?.split('@')[0] : "Guest";
  const totalDonations = donations?.reduce((sum, donation) => sum + donation.donation_amount, 0) || 0;

  // Calculate donations by county
  const donationsByCounty = donations?.reduce((acc, donation) => {
    const county = donation.county || 'Unknown';
    acc[county] = (acc[county] || 0) + donation.donation_amount;
    return acc;
  }, {} as Record<string, number>) || {};

  const countyChartData = Object.entries(donationsByCounty).map(([county, amount]) => ({
    county,
    amount,
  }));

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {displayName}</h1>
          <p className="text-muted-foreground">Manage your donations and profile</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => navigate("/profile")}>
            Profile Settings
          </Button>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-32 h-32 bg-accent rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img 
                  src="/lovable-uploads/f228ec90-d0f3-4470-85f2-f90cbc734b6d.png" 
                  alt="Cub Scouts Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <Button 
                className="w-full"
                onClick={() => navigate("/donor-submission")}
              >
                Submit New Donation
              </Button>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h2 className="text-2xl font-semibold mb-4">Total Donations</h2>
            <div className="flex flex-col space-y-4">
              <div>
                <p className="text-2xl font-bold text-primary">
                  ${totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Total amount donated to date</p>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={countyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="county" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#1a365d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-2xl font-semibold mb-4">Donation History</h2>
          {isLoading ? (
            <p>Loading donations...</p>
          ) : donations && donations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Appeal</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>
                      {donation.created_at ? 
                        format(new Date(donation.created_at), 'MMM dd, yyyy') : 
                        'N/A'}
                    </TableCell>
                    <TableCell>{donation.appeal_name}</TableCell>
                    <TableCell>${donation.donation_amount.toFixed(2)}</TableCell>
                    <TableCell>{donation.giving_category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No donations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
