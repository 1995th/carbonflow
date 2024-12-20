interface LocationFilterProps {
  selected: string[];
  onChange: (locations: string[]) => void;
}

const LOCATIONS = [
  'North America',
  'South America',
  'Europe',
  'Asia',
  'Africa',
  'Oceania'
];

export function LocationFilter({ selected, onChange }: LocationFilterProps) {
  const toggleLocation = (location: string) => {
    const newLocations = selected.includes(location)
      ? selected.filter(l => l !== location)
      : [...selected, location];
    onChange(newLocations);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Location</h3>
      <div className="space-y-1">
        {LOCATIONS.map(location => (
          <label key={location} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(location)}
              onChange={() => toggleLocation(location)}
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <span className="ml-2 text-sm text-gray-600">{location}</span>
          </label>
        ))}
      </div>
    </div>
  );
}