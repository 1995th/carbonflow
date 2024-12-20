import { useTransactionsQuery } from '../../hooks/queries/useTransactionsQuery';
import { useAuthContext } from '../../contexts/AuthContext';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { TransactionRow } from './TransactionRow';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { ErrorMessage } from '../ui/ErrorMessage';
import { EmptyState } from '../ui/EmptyState';

export function TransactionList() {
  const { user } = useAuthContext();
  const { 
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useTransactionsQuery(user?.id);

  const { setTarget } = useInfiniteScroll(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { enabled: !!hasNextPage }
  );

  if (isLoading) return <TransactionListSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.pages[0].transactions.length) {
    return <EmptyState message="No transactions yet" />;
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.pages.map((page) =>
              page.transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div ref={setTarget} className="py-4">
          {isFetchingNextPage && <LoadingSkeleton className="h-8" />}
        </div>
      )}
    </div>
  );
}

function TransactionListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-lg">
          <LoadingSkeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  );
}