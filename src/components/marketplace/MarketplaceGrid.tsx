import { CreditCard } from '../CreditCard';
import { Loader } from '../ui/Loader';
import { ErrorMessage } from '../ui/ErrorMessage';
import type { CarbonCredit } from '../../types';

interface MarketplaceGridProps {
  credits: CarbonCredit[];
  loading: boolean;
  error: Error | null;
}

export function MarketplaceGrid({ credits, loading, error }: MarketplaceGridProps) {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!credits.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {credits.map((credit) => (
        <CreditCard key={credit.id} credit={credit} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-2">No credits available</h3>
      <p className="text-gray-600">Try adjusting your filters or check back later.</p>
    </div>
  );
}