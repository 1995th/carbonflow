import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '../providers';

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      updateBalance();
    }
  }, [address]);

  async function updateBalance() {
    try {
      const provider = await getProvider();
      const balance = await provider.getBalance(address!);
      setBalance(ethers.formatEther(balance));
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    }
  }

  async function connect() {
    setIsConnecting(true);
    setError(null);

    try {
      const provider = await getProvider();
      const accounts = await provider.send('eth_requestAccounts', []);
      setAddress(accounts[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }

  async function disconnect() {
    setAddress(null);
    setBalance(null);
  }

  return {
    address,
    balance,
    isConnecting,
    error,
    connect,
    disconnect,
    updateBalance
  };
}