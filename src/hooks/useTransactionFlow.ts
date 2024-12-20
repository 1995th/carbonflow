import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { checkAndApproveUSDC } from '../lib/web3/transactions/usdcApproval';
import { executePurchaseTransaction } from '../lib/web3/transactions/purchaseTransaction';
import { createPurchaseRecord } from '../lib/database/transactions';
import { useWeb3 } from '../lib/web3/hooks';

export function useTransactionFlow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const { address } = useWeb3();

  const processPurchase = async (
    creditId: string,
    quantity: number,
    pricePerCredit: number
  ) => {
    if (!user || !address) throw new Error('User not authenticated');
    setLoading(true);
    setError(null);

    try {
      // Step 1: Approve USDC spending
      const totalAmount = quantity * pricePerCredit;
      const approvalResult = await checkAndApproveUSDC(totalAmount, address);
      if (!approvalResult.success) {
        throw new Error(approvalResult.error || 'Failed to approve USDC');
      }

      // Step 2: Execute purchase transaction
      const purchaseResult = await executePurchaseTransaction(creditId, quantity);
      if (!purchaseResult.success) {
        throw new Error(purchaseResult.error || 'Purchase transaction failed');
      }

      // Step 3: Update database records
      await createPurchaseRecord({ creditId, quantity, pricePerCredit }, user.id);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    processPurchase,
    loading,
    error
  };
}