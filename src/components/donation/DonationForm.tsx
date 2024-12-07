import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DonationOptions } from "./DonationOptions";
import { PaymentMethods } from "./PaymentMethods";
import { DonateButton } from "./DonateButton";

interface DonationFormProps {
  selectedAmount: number | null;
  customAmount: string;
  frequency: string;
  paymentMethod: string;
  selectedCounty: string;
  isSubmitting: boolean;
  onAmountSelect: (amount: number) => void;
  onCustomAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFrequencyChange: (value: string) => void;
  onPaymentMethodChange: (value: string) => void;
  onCountyChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const DonationForm = ({
  selectedAmount,
  customAmount,
  frequency,
  paymentMethod,
  selectedCounty,
  isSubmitting,
  onAmountSelect,
  onCustomAmountChange,
  onFrequencyChange,
  onPaymentMethodChange,
  onCountyChange,
  onSubmit
}: DonationFormProps) => {
  const donationOptions = [
    {
      amount: 119,
      label: "Basic Support",
      description: "Provides essential supplies for one Scout",
      type: "basic",
      matchPercentage: 90,
    },
    {
      amount: 158,
      label: "Regular Support",
      description: "Funds a Scout's monthly activities and badges",
      type: "regular",
      matchPercentage: 95,
    },
    {
      amount: 386,
      label: "Enhanced Support",
      description: "Sponsors a Scout's camping trip and equipment",
      type: "enhanced",
      matchPercentage: 85,
    },
  ];

  const finalAmount = selectedAmount || (customAmount ? Number(customAmount) : null);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <DonationOptions 
        options={donationOptions}
        selectedAmount={selectedAmount}
        onSelectAmount={onAmountSelect}
      />

      <div className="mb-8">
        <label className="block text-sm text-gray-300 mb-2">Custom Amount</label>
        <Input
          type="number"
          value={customAmount}
          onChange={onCustomAmountChange}
          placeholder="Enter amount"
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-400 mt-1">Could provide essential supplies and badges</p>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">Select County</label>
        <Select onValueChange={onCountyChange} value={selectedCounty}>
          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Select a county" />
          </SelectTrigger>
          <SelectContent>
            {["Miami-Dade", "Broward", "Monroe"].map((county) => (
              <SelectItem key={county} value={county}>
                {county}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-2">Donation Frequency</label>
        <div className="grid grid-cols-3 gap-4">
          {["one-time", "monthly", "yearly"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onFrequencyChange(option)}
              className={`p-3 rounded-lg border ${
                frequency === option
                  ? "border-blue-500 bg-blue-500/10 text-white"
                  : "border-gray-700 hover:border-gray-600 bg-gray-800 text-gray-300"
              } transition-all capitalize`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <PaymentMethods
        selectedMethod={paymentMethod}
        onSelectMethod={onPaymentMethodChange}
      />

      <DonateButton
        amount={finalAmount}
        isSubmitting={isSubmitting}
        onClick={onSubmit}
      />
    </form>
  );
};