import React from 'react';
import { CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { formatDate } from '../../utils/date';

interface TransactionConfirmationProps {
  type: 'purchase' | 'retirement';
  quantity: number;
  pricePerCredit: number;
  creditName: string;
  transactionHash: string;
  timestamp: string;
  onClose: () => void;
}

export function TransactionConfirmation({
  type,
  quantity,
  pricePerCredit,
  creditName,
  transactionHash,
  timestamp,
  onClose
}: TransactionConfirmationProps) {
  const totalAmount = quantity * pricePerCredit;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {type === 'purchase' ? 'Purchase Successful' : 'Credits Retired'}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <DetailRow label="Credit" value={creditName} />
            <DetailRow label="Quantity" value={quantity.toString()} />
            {type === 'purchase' && (
              <>
                <DetailRow 
                  label="Price per credit" 
                  value={formatCurrency(pricePerCredit)} 
                />
                <DetailRow 
                  label="Total amount" 
                  value={formatCurrency(totalAmount)}
                  highlighted 
                />
              </>
            )}
            <DetailRow 
              label="Transaction time" 
              value={formatDate(timestamp)} 
            />
          </div>

          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Transaction Hash:</p>
            <p className="font-mono break-all bg-gray-50 p-2 rounded">
              {transactionHash}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}