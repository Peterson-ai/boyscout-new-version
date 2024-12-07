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

const DonorList = () => {
  const { data: donors, isLoading } = useQuery({
    queryKey: ['donors'],
    queryFn: getDonors,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Donor List</h1>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donors?.map((donor) => (
              <TableRow key={donor.id}>
                <TableCell>{donor.first_name} {donor.last_org_name}</TableCell>
                <TableCell>{donor.email}</TableCell>
                <TableCell>${donor.donation_amount.toFixed(2)}</TableCell>
                <TableCell>{donor.giving_category}</TableCell>
                <TableCell>
                  {donor.created_at ? new Date(donor.created_at).toLocaleDateString() : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DonorList;