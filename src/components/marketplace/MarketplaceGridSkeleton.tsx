import { LoadingSkeleton } from '../ui/LoadingSkeleton';

export function MarketplaceGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          <LoadingSkeleton className="w-full h-48" />
          <LoadingSkeleton className="w-3/4 h-6" />
          <LoadingSkeleton className="w-1/2 h-4" />
          <div className="space-y-2">
            <LoadingSkeleton className="w-full h-4" />
            <LoadingSkeleton className="w-full h-4" />
          </div>
          <LoadingSkeleton className="w-full h-10" />
        </div>
      ))}
    </div>
  );
}