interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AuthInput({ label, id, ...props }: AuthInputProps) {
  return (
    <div>
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 
          focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
        {...props}
      />
    </div>
  );
}