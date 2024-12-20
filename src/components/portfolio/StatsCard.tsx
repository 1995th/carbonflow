interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  valueColor?: string;
}

export function StatsCard({ icon, label, value, subValue, valueColor = 'text-gray-900' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`text-2xl font-semibold ${valueColor}`}>
            {value}
            {subValue && <span className="text-sm ml-1">({subValue})</span>}
          </p>
        </div>
      </div>
    </div>
  );
}