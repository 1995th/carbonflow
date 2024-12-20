import React from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface TransactionStatusProps {
  status: 'success' | 'error' | 'loading';
  message: string;
  onClose?: () => void;
}

export function TransactionStatus({ status, message, onClose }: TransactionStatusProps) {
  const icons = {
    success: <CheckCircle className="h-6 w-6 text-emerald-600" />,
    error: <XCircle className="h-6 w-6 text-red-600" />,
    loading: <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
  };

  const backgrounds = {
    success: 'bg-emerald-50',
    error: 'bg-red-50',
    loading: 'bg-blue-50'
  };

  return (
    <div className={`fixed bottom-4 right-4 ${backgrounds[status]} p-4 rounded-lg shadow-lg max-w-md`}>
      <div className="flex items-center gap-3">
        {icons[status]}
        <p className="text-gray-900">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}