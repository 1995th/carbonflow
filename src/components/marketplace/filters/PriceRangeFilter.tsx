interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({ value, onChange }: PriceRangeFilterProps) {
  const [min, max] = value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    onChange([newMin, max]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    onChange([min, newMax]);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500">Min</label>
          <input
            type="number"
            value={min}
            onChange={handleMinChange}
            min={0}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Max</label>
          <input
            type="number"
            value={max}
            onChange={handleMaxChange}
            min={min}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}