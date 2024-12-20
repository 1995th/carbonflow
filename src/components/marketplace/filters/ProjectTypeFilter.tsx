interface ProjectTypeFilterProps {
  selected: string[];
  onChange: (types: string[]) => void;
}

const PROJECT_TYPES = [
  'Forest Conservation',
  'Renewable Energy',
  'Ecosystem Restoration',
  'Methane Capture',
  'Energy Efficiency'
];

export function ProjectTypeFilter({ selected, onChange }: ProjectTypeFilterProps) {
  const toggleType = (type: string) => {
    const newTypes = selected.includes(type)
      ? selected.filter(t => t !== type)
      : [...selected, type];
    onChange(newTypes);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Project Type</h3>
      <div className="space-y-1">
        {PROJECT_TYPES.map(type => (
          <label key={type} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(type)}
              onChange={() => toggleType(type)}
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <span className="ml-2 text-sm text-gray-600">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}