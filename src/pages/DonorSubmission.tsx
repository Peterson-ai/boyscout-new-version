import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { DonorFormContainer } from "@/components/donor/DonorFormContainer";
import { supabase } from "@/lib/supabase";

const DonorSubmission = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const donorData = {
        appeal_code: data.appeal_code,
        year: data.year,
        appeal_name: data.appeal_name,
        structure: data.structure,
        giving_category: data.giving_category,
        county: data.county,
        donation_amount: data.donation_amount,
        first_name: data.first_name,
        last_org_name: data.last_org_name,
        city: data.city,
        state: data.state,
        zip: data.zip,
        email: user.email,
        user_id: user.id,
      };

      const { error } = await supabase
        .from("donors")
        .insert([donorData]);

      if (error) throw error;

      toast.success("Donor information submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting donor:", error);
      toast.error("Failed to submit donor information");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Submit Donor Information</h1>
        <p className="text-muted-foreground">
          Please fill out the form below with the donor details.
        </p>
      </div>

      <Card className="p-6">
        <DonorFormContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Card>
    </div>
  );
};

export default DonorSubmission;