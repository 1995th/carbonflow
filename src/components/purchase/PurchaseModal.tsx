import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Loader2, Wallet } from 'lucide-react';
import { useWeb3 } from '../../lib/web3/hooks';
import { useUSDCBalance } from '../../hooks/useUSDCBalance';
import { useTransactionFlow } from '../../hooks/useTransactionFlow';
import { formatCurrency } from '../../utils/format';
import type { CarbonCredit } from '../../types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  credit: CarbonCredit;
}

export function PurchaseModal({ isOpen, onClose, credit }: PurchaseModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isApproving, setIsApproving] = useState(false);
  const { address, isConnected } = useWeb3();
  const { balance, loading: balanceLoading } = useUSDCBalance();
  const { processPurchase, loading, error } = useTransactionFlow();

  const totalAmount = quantity * credit.price;
  const hasEnoughBalance = Number(balance) >= totalAmount;

  const handlePurchase = async () => {
    if (!isConnected || !hasEnoughBalance) return;

    try {
      setIsApproving(true);
      const success = await processPurchase(credit.id, quantity, credit.price);
      if (success) {
        onClose();
      }
    } finally {
      setIsApproving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Purchase Credits</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900">{credit.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{credit.verificationStandard}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price per credit</span>
              <span>{formatCurrency(credit.price)} USDC</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total amount</span>
              <span>{formatCurrency(totalAmount)} USDC</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span>Your USDC balance</span>
              <span className={hasEnoughBalance ? 'text-emerald-600' : 'text-red-600'}>
                {balanceLoading ? '...' : `${formatCurrency(Number(balance))} USDC`}
              </span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 text-red-600 bg-red-50 rounded-lg">
              <AlertCircle size={16} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!isConnected ? (
            <div className="text-center text-sm text-gray-600">
              Please connect your wallet to purchase credits
            </div>
          ) : !hasEnoughBalance ? (
            <div className="text-center text-sm text-red-600">
              Insufficient USDC balance
            </div>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={loading || isApproving}
              className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg 
                hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading || isApproving ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  {isApproving ? 'Approving USDC...' : 'Processing...'}
                </>
              ) : (
                'Confirm Purchase'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}