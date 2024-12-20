import { useState } from 'react';
import { ethers } from 'ethers';
import { CarbonMarket } from '../contracts/CarbonMarket';
import { getProvider, getSigner } from '../providers';

const MARKET_ADDRESS = import.meta.env.VITE_CARBON_MARKET_ADDRESS;

export function useCarbonContract() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeTransaction = async (
    operation: 'purchase' | 'retire',
    creditId: string,
    amount: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const provider = await getProvider();
      const signer = await getSigner();
      const market = new CarbonMarket(MARKET_ADDRESS, provider);

      const tx = operation === 'purchase' 
        ? await market.purchaseCredits(creditId, amount, signer)
        : await market.retireCredits(creditId, amount, signer);

      await tx.wait();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    executeTransaction,
    loading,
    error
  };
}