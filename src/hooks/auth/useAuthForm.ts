import { useState } from 'react';
import { useWeb3 } from '../../lib/web3/hooks';

export function useAuthForm() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const { isConnected, connectWallet } = useWeb3();

  const handleWalletConnection = async () => {
    if (isConnected) return true;

    setIsConnecting(true);
    setError('');

    try {
      await connectWallet();
      return true;
    } catch (err) {
      setError('Please connect your wallet to continue');
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    isConnecting,
    error,
    setError,
    handleWalletConnection,
    isConnected
  };
}