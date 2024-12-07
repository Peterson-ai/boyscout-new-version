import { useState } from "react";
import DonorForm, { DonorData } from "@/components/DonorForm";
import Results from "@/components/Results";

const Index = () => {
  const [results, setResults] = useState<{
    engagementPrediction: string;
    clusterAssignment: number;
    donationAmount: number;
  } | null>(null);

  const handleFormSubmit = (data: DonorData) => {
    // This is where you would normally call your AI model
    // For now, we'll simulate the response
    setResults({
      engagementPrediction: data.donationAmount > 1000 ? "High" : "Low",
      clusterAssignment: Math.floor(Math.random() * 3),
      donationAmount: data.donationAmount,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Donor Profiling Analysis</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Enter Donor Information</h2>
            <DonorForm onSubmit={handleFormSubmit} />
          </div>
          
          {results && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              <Results {...results} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;