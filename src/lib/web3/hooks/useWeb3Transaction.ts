import { useState } from 'react';
import { supabase } from '../../supabase';
import { useTransaction } from './useTransaction';
import { usePurchaseCredit } from '../../hooks/usePurchaseCredit';

export function useWeb3Transaction() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { purchaseCredits: web3Purchase } = useTransaction();
  const { purchaseCredit: dbPurchase } = usePurchaseCredit();

  const purchaseCredits = async (
    creditId: string,
    quantity: string,
    pricePerCredit: number
  ) => {
    setIsProcessing(true);
    setError(null);

    try {
      // First process Web3 transaction
      const web3Success = await web3Purchase(
        creditId,
        quantity,
        (Number(quantity) * pricePerCredit).toString()
      );

      if (!web3Success) {
        throw new Error('Web3 transaction failed');
      }

      // Then update database
      await dbPurchase({
        creditId,
        quantity: Number(quantity),
        pricePerCredit,
        totalAmount: Number(quantity) * pricePerCredit
      });

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    purchaseCredits,
    isProcessing,
    error
  };
}