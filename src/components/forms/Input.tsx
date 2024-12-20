import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded-lg bg-white border transition-colors",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:border-emerald-500 focus:ring-emerald-200",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';