import React from 'react';
import { useWatchlist } from '../../hooks/useWatchlist';
import { CreditCard } from '../CreditCard';
import { Loader } from '../ui/Loader';
import { ErrorMessage } from '../ui/ErrorMessage';

export function WatchlistSection() {
  const { watchlist, loading, error } = useWatchlist();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!watchlist.length) return <EmptyWatchlist />;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Watchlist</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {watchlist.map((credit) => (
          <CreditCard key={credit.id} credit={credit} />
        ))}
      </div>
    </div>
  );
}

function EmptyWatchlist() {
  return (
    <div className="text-center py-6">
      <p className="text-gray-600">No credits in your watchlist yet.</p>
    </div>
  );
}