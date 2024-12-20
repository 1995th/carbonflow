import { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { ProjectTypeFilter } from './ProjectTypeFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { LocationFilter } from './LocationFilter';

export interface FilterState {
  projectTypes: string[];
  priceRange: [number, number];
  locations: string[];
}

interface MarketplaceFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export function MarketplaceFilters({ onFilterChange }: MarketplaceFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    projectTypes: [],
    priceRange: [0, 1000],
    locations: []
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="font-medium">Filters</span>
        <Filter className="w-4 h-4 ml-1" />
      </button>

      {isOpen && (
        <div className="mt-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProjectTypeFilter
              selected={filters.projectTypes}
              onChange={(types) => handleFilterChange('projectTypes', types)}
            />
            <PriceRangeFilter
              value={filters.priceRange}
              onChange={(range) => handleFilterChange('priceRange', range)}
            />
            <LocationFilter
              selected={filters.locations}
              onChange={(locations) => handleFilterChange('locations', locations)}
            />
          </div>
        </div>
      )}
    </div>
  );
}