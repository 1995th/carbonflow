import { useTransactions } from '../../hooks/useTransactions';
import { useAuthContext } from '../../contexts/AuthContext';
import { TransactionList } from './TransactionList';
import { TransactionFilters } from './TransactionFilters';
import { Loader } from '../ui/Loader';
import { ErrorMessage } from '../ui/ErrorMessage';
import { EmptyState } from '../ui/EmptyState';
import { useState } from 'react';

export type TransactionFilter = 'all' | 'purchase' | 'retirement';

export function TransactionHistory() {
  const { user } = useAuthContext();
  const { transactions, loading, error } = useTransactions(user?.id);
  const [filter, setFilter] = useState<TransactionFilter>('all');

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!transactions.length) return <EmptyState message="No transaction history yet" />;

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  return (
    <div className="space-y-6">
      <TransactionFilters currentFilter={filter} onFilterChange={setFilter} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}