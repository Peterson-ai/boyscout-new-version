import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ResultsProps {
  engagementPrediction: string;
  clusterAssignment: number;
  donationAmount: number;
}

const Results = ({ engagementPrediction, clusterAssignment, donationAmount }: ResultsProps) => {
  const chartData = [
    {
      name: "Donation",
      amount: donationAmount,
    },
  ];

  return (
    <Card className="p-6 w-full max-w-md">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Engagement Prediction</h3>
          <div className={`p-3 rounded-md ${
            engagementPrediction === "High" ? "bg-success text-white" : "bg-accent"
          }`}>
            {engagementPrediction} Engagement Donor
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Donor Cluster</h3>
          <div className="p-3 rounded-md bg-secondary text-white">
            Cluster {clusterAssignment}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Donation Overview</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#1a365d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Results;