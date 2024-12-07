import { useQuery } from "@tanstack/react-query";
import { getDonors } from "@/lib/donors";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const { data: donors, isLoading } = useQuery({
    queryKey: ['donors'],
    queryFn: getDonors,
  });

  if (isLoading) return <div>Loading...</div>;

  // Calculate analytics data
  const donationsByCategory = donors?.reduce((acc, donor) => {
    const category = donor.giving_category;
    acc[category] = (acc[category] || 0) + donor.donation_amount;
    return acc;
  }, {} as Record<string, number>) || {};

  const chartData = Object.entries(donationsByCategory).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="grid gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Donations by Category</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;