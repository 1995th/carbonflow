import React, { useState } from 'react';
import { X, AlertCircle, Loader2, TreePine } from 'lucide-react';
import { useTransaction } from '../../lib/web3/hooks/useTransaction';
import type { Portfolio } from '../../types';

interface RetireModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioItem: Portfolio;
}

export function RetireModal({ isOpen, onClose, portfolioItem }: RetireModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { retireCredits, isProcessing, error } = useTransaction();

  if (!isOpen) return null;

  const handleRetire = async () => {
    try {
      const success = await retireCredits(
        portfolioItem.credit_id,
        quantity.toString()
      );
      
      if (success) {
        onClose();
      }
    } catch (err) {
      console.error('Retirement failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <TreePine className="h-6 w-6 text-emerald-600" />
          <h2 className="text-2xl font-bold text-gray-900">Retire Credits</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">{portfolioItem.carbon_credits.name}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Retiring carbon credits permanently removes them from circulation, 
              representing a real reduction in carbon emissions.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity to Retire
            </label>
            <input
              type="number"
              min="1"
              max={portfolioItem.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(portfolioItem.quantity, Math.max(1, parseInt(e.target.value))))}
              className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
            <p className="mt-1 text-sm text-gray-500">
              Available: {portfolioItem.quantity} credits
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-red-600 bg-red-50 rounded-lg">
              <AlertCircle size={16} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleRetire}
            disabled={isProcessing}
            className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Processing...
              </>
            ) : (
              'Confirm Retirement'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}