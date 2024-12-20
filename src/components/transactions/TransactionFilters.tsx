import { TransactionFilter } from './TransactionHistory';

interface TransactionFiltersProps {
  currentFilter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
}

export function TransactionFilters({ currentFilter, onFilterChange }: TransactionFiltersProps) {
  return (
    <div className="flex space-x-2">
      <FilterButton
        active={currentFilter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        All
      </FilterButton>
      <FilterButton
        active={currentFilter === 'purchase'}
        onClick={() => onFilterChange('purchase')}
      >
        Purchases
      </FilterButton>
      <FilterButton
        active={currentFilter === 'retirement'}
        onClick={() => onFilterChange('retirement')}
      >
        Retirements
      </FilterButton>
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${active 
          ? 'bg-emerald-100 text-emerald-700' 
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
        }`}
    >
      {children}
    </button>
  );
}