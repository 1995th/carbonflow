import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded-lg bg-white border transition-colors appearance-none",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200",
          className
        )}
        {...props}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';