import React from 'react';
import { validateQuantity } from '../../utils/validation';

interface QuantityInputProps {
  quantity: number;
  available: number;
  onChange: (value: number) => void;
  minQuantity?: number;
  className?: string;
}

export function QuantityInput({
  quantity,
  available,
  onChange,
  minQuantity = 1,
  className = ''
}: QuantityInputProps) {
  const validation = validateQuantity(quantity, available, minQuantity);

  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(minQuantity, quantity - 1))}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={quantity <= minQuantity}
        >
          -
        </button>
        
        <input
          type="number"
          value={quantity}
          onChange={(e) => onChange(parseInt(e.target.value) || minQuantity)}
          min={minQuantity}
          max={available}
          className="w-20 px-3 py-2 text-center rounded-lg bg-white/50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
        
        <button
          type="button"
          onClick={() => onChange(Math.min(available, quantity + 1))}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={quantity >= available}
        >
          +
        </button>
      </div>
      
      {!validation.isValid && (
        <p className="mt-1 text-sm text-red-600">{validation.error}</p>
      )}
    </div>
  );
}