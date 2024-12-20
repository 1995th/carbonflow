import React from 'react';
import { Loader2 } from 'lucide-react';
import { QuantityInput } from './QuantityInput';
import { useFormValidation } from '../../hooks/useFormValidation';
import { validateTransaction } from '../../utils/validation';
import { formatCurrency } from '../../utils/format';

interface TransactionFormProps {
  type: 'purchase' | 'retire';
  available: number;
  pricePerCredit: number;
  walletBalance: string;
  onSubmit: (quantity: number) => Promise<void>;
  isProcessing?: boolean;
}

export function TransactionForm({
  type,
  available,
  pricePerCredit,
  walletBalance,
  onSubmit,
  isProcessing = false
}: TransactionFormProps) {
  const [quantity, setQuantity] = React.useState(1);
  const { errors, validateField, clearErrors } = useFormValidation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    const isValid = validateField('transaction', () =>
      validateTransaction(quantity, available, walletBalance)
    );

    if (isValid) {
      await onSubmit(quantity);
    }
  };

  const totalAmount = quantity * pricePerCredit;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <QuantityInput
          quantity={quantity}
          available={available}
          onChange={setQuantity}
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between text-sm mb-2">
          <span>Price per credit</span>
          <span>{formatCurrency(pricePerCredit)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total amount</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      {errors.transaction && (
        <p className="text-sm text-red-600">{errors.transaction}</p>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
            Processing...
          </>
        ) : (
          `Confirm ${type === 'purchase' ? 'Purchase' : 'Retirement'}`
        )}
      </button>
    </form>
  );
}