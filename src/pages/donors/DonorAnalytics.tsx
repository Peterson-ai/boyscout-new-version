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

const DonorAnalytics = () => {
  const { data: donors, isLoading } = useQuery({
    queryKey: ['donors'],
    queryFn: getDonors,
  });

  if (isLoading) return <div>Loading...</div>;

  // Calculate donor statistics
  const totalDonors = donors?.length || 0;
  const totalDonations = donors?.reduce((sum, donor) => sum + donor.donation_amount, 0) || 0;
  const averageDonation = totalDonors ? totalDonations / totalDonors : 0;

  // Get top donors
  const topDonors = [...(donors || [])]
    .sort((a, b) => b.donation_amount - a.donation_amount)
    .slice(0, 5);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Donor Analytics</h1>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-2">Total Donors</h2>
          <p className="text-3xl font-bold">{totalDonors}</p>
        </div>
        
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-2">Total Donations</h2>
          <p className="text-3xl font-bold">${totalDonations.toFixed(2)}</p>
        </div>
        
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-lg font-semibold mb-2">Average Donation</h2>
          <p className="text-3xl font-bold">${averageDonation.toFixed(2)}</p>
        </div>
      </div>

      <div className="border rounded-lg">
        <h2 className="text-xl font-semibold p-6">Top Donors</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Donations</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDonors.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell>{donor.first_name} {donor.last_org_name}</TableCell>
                <TableCell>{donor.email}</TableCell>
                <TableCell>${donor.donation_amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DonorAnalytics;