import React from 'react';
import { TransactionHistory } from '../../transactions/TransactionHistory';

export function DashboardHistory() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
      <TransactionHistory />
    </div>
  );
}