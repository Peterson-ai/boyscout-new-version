import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { APPEAL_OPTIONS } from "@/utils/donorUtils";

interface AppealSectionProps {
  control: Control<any>;
}

export const AppealSection = ({ control }: AppealSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="appeal_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appeal Code</FormLabel>
              <FormControl>
                <Input {...field} readOnly className="bg-gray-100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="appeal_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Appeal Name</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select appeal name" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {APPEAL_OPTIONS.map((option) => (
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
    </>
  );
};