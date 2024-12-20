interface DetailRowProps {
  label: string;
  value: string;
  highlighted?: boolean;
}

export function DetailRow({ label, value, highlighted = false }: DetailRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}</span>
      <span className={highlighted ? 'font-semibold text-emerald-600' : 'text-gray-900'}>
        {value}
      </span>
    </div>
  );
}