import { useState } from 'react';

interface TransactionReceipt {
  type: 'purchase' | 'retirement';
  quantity: number;
  pricePerCredit: number;
  creditName: string;
  transactionHash: string;
  timestamp: string;
}

export function useTransactionReceipt() {
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

  const createReceipt = (data: TransactionReceipt) => {
    setReceipt(data);
  };

  const clearReceipt = () => {
    setReceipt(null);
  };

  return {
    receipt,
    createReceipt,
    clearReceipt
  };
}