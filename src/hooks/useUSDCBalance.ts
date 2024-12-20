import { useState, useEffect } from 'react';
import { USDCToken } from '../lib/web3/contracts/USDCToken';
import { getProvider } from '../lib/web3/providers';
import { useWeb3 } from '../lib/web3/hooks';
import { USDC_ADDRESS } from '../lib/web3/constants';

export function useUSDCBalance() {
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useWeb3();

  const fetchBalance = async () => {
    if (!address || !isConnected || !USDC_ADDRESS) return;

    setLoading(true);
    setError(null);

    try {
      const provider = await getProvider();
      const usdc = new USDCToken(USDC_ADDRESS, provider);
      const balance = await usdc.getBalance(address);
      setBalance(balance);
    } catch (err) {
      console.error('Error fetching USDC balance:', err);
      setError('Failed to fetch USDC balance');
      setBalance('0');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
    // Set up polling for balance updates
    const interval = setInterval(fetchBalance, 15000); // Every 15 seconds
    return () => clearInterval(interval);
  }, [address, isConnected]);

  return { balance, loading, error, refetch: fetchBalance };
}