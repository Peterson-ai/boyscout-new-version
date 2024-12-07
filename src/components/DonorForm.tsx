import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface DonorData {
  appealName: string;
  structure: string;
  givingCategory: string;
  donationAmount: number;
}

interface DonorFormProps {
  onSubmit: (data: DonorData) => void;
}

const DonorForm = ({ onSubmit }: DonorFormProps) => {
  const [formData, setFormData] = useState<DonorData>({
    appealName: "",
    structure: "",
    givingCategory: "",
    donationAmount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6 w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="appealName">Appeal Name</Label>
          <Select
            value={formData.appealName}
            onValueChange={(value) => setFormData({ ...formData, appealName: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select appeal name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="annual">Annual Appeal</SelectItem>
              <SelectItem value="special">Special Campaign</SelectItem>
              <SelectItem value="emergency">Emergency Fund</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="structure">Structure</Label>
          <Select
            value={formData.structure}
            onValueChange={(value) => setFormData({ ...formData, structure: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select structure" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="organization">Organization</SelectItem>
              <SelectItem value="foundation">Foundation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="givingCategory">Giving Category</Label>
          <Select
            value={formData.givingCategory}
            onValueChange={(value) => setFormData({ ...formData, givingCategory: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select giving category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="major">Major Donor</SelectItem>
              <SelectItem value="regular">Regular Donor</SelectItem>
              <SelectItem value="first-time">First Time Donor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="donationAmount">Donation Amount ($)</Label>
          <Input
            id="donationAmount"
            type="number"
            value={formData.donationAmount}
            onChange={(e) => setFormData({ ...formData, donationAmount: Number(e.target.value) })}
            min="0"
            step="0.01"
            required
          />
        </div>

        <Button type="submit" className="w-full">Analyze Donor</Button>
      </form>
    </Card>
  );
};

export default DonorForm;