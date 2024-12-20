import { useState } from 'react';
import { ethers } from 'ethers';
import { getProvider, getSigner } from '../providers';
import { CarbonMarket } from '../contracts/CarbonMarket';
import { CarbonToken } from '../contracts/CarbonToken';

const MARKET_ADDRESS = import.meta.env.VITE_CARBON_MARKET_ADDRESS;
const TOKEN_ADDRESS = import.meta.env.VITE_CARBON_TOKEN_ADDRESS;

export function useTransaction() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function purchaseCredits(creditId: string, amount: string, price: string) {
    setIsProcessing(true);
    setError(null);

    try {
      const provider = await getProvider();
      const signer = await getSigner();
      
      // Initialize contracts
      const token = new CarbonToken(TOKEN_ADDRESS, provider);
      const market = new CarbonMarket(MARKET_ADDRESS, provider);

      // Approve token spending
      const approveTx = await token.approve(MARKET_ADDRESS, price, signer);
      await approveTx.wait();

      // Purchase credits
      const purchaseTx = await market.purchaseCredits(creditId, amount, signer);
      await purchaseTx.wait();

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      console.error('Transaction error:', err);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }

  async function retireCredits(creditId: string, amount: string) {
    setIsProcessing(true);
    setError(null);

    try {
      const provider = await getProvider();
      const signer = await getSigner();
      const market = new CarbonMarket(MARKET_ADDRESS, provider);

      const tx = await market.retireCredits(creditId, amount, signer);
      await tx.wait();

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      console.error('Transaction error:', err);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }

  return {
    purchaseCredits,
    retireCredits,
    isProcessing,
    error
  };
}