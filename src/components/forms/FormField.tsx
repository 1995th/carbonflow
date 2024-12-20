import { cn } from '../../utils/cn';

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  name,
  error,
  touched,
  children,
  required,
  className
}: FormFieldProps) {
  const showError = touched && error;

  return (
    <div className={cn('space-y-1', className)}>
      <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {children}
      
      {showError && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}