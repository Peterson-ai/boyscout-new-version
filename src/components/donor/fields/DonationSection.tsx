import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { COUNTY_OPTIONS } from "@/utils/donorUtils";

interface DonationSectionProps {
  control: Control<any>;
}

export const DonationSection = ({ control }: DonationSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="county"
        render={({ field }) => (
          <FormItem>
            <FormLabel>County</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {COUNTY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="donation_amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Donation Amount ($)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field} 
                onChange={e => field.onChange(parseFloat(e.target.value))}
                min="0"
                step="0.01"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};