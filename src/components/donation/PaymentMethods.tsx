import { CreditCard, Building2, Wallet } from "lucide-react";

interface PaymentMethodsProps {
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
}

export const PaymentMethods = ({ selectedMethod, onSelectMethod }: PaymentMethodsProps) => {
  const methods = [
    { id: "credit-card", label: "Credit Card", icon: CreditCard },
    { id: "bank-transfer", label: "Bank Transfer", icon: Building2 },
    { id: "paypal", label: "PayPal", icon: Wallet },
  ];

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-2">Payment Method</label>
      <div className="grid grid-cols-3 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelectMethod(method.id)}
            className={`p-3 rounded-lg border ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-500/10 text-white"
                : "border-gray-700 hover:border-gray-600 bg-gray-800 text-gray-300"
            } transition-all`}
          >
            <div className="flex flex-col items-center gap-2">
              <method.icon size={20} />
              <span className="text-sm">{method.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};