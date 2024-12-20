import { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastType = 'success' | 'error';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={cn(
      "fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg",
      type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
    )}>
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <p className="text-sm">{message}</p>
      <button onClick={onClose} className="ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}