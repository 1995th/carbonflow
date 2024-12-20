import { useState } from 'react';
import { useCredits } from '../../../hooks/useCredits';
import { MarketplaceFilters, FilterState } from '../../marketplace/filters/MarketplaceFilters';
import { MarketplaceGrid } from '../../marketplace/MarketplaceGrid';

export function DashboardMarketplace() {
  const { credits, loading, error } = useCredits();
  const [filters, setFilters] = useState<FilterState>({
    projectTypes: [],
    priceRange: [0, 1000],
    locations: []
  });

  const filteredCredits = credits.filter(credit => {
    const matchesType = filters.projectTypes.length === 0 || 
      filters.projectTypes.includes(credit.projectType);
    const matchesPrice = credit.price >= filters.priceRange[0] && 
      credit.price <= filters.priceRange[1];
    const matchesLocation = filters.locations.length === 0 || 
      filters.locations.includes(credit.location);
    
    return matchesType && matchesPrice && matchesLocation;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
        <p className="mt-2 text-gray-600">Browse and purchase verified carbon credits from various projects worldwide.</p>
      </div>

      <MarketplaceFilters onFilterChange={setFilters} />
      <MarketplaceGrid 
        credits={filteredCredits}
        loading={loading}
        error={error}
      />
    </div>
  );
}