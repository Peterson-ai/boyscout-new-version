import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { STRUCTURE_OPTIONS, GIVING_CATEGORY_OPTIONS } from "@/utils/donorUtils";

interface DonorTypeSectionProps {
  control: Control<any>;
}

export const DonorTypeSection = ({ control }: DonorTypeSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="structure"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Structure</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select structure" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {STRUCTURE_OPTIONS.map((option) => (
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
        name="giving_category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Giving Category</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select giving category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {GIVING_CATEGORY_OPTIONS.map((option) => (
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
    </div>
  );
};