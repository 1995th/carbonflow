import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/format';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Transaction } from '../../types';

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const isRetirement = transaction.type === 'retirement';
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {isRetirement ? (
            <ArrowDownRight className="h-4 w-4 text-orange-500 mr-2" />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-2" />
          )}
          <span className={`text-sm font-medium ${
            isRetirement ? 'text-orange-700' : 'text-emerald-700'
          }`}>
            {isRetirement ? 'Retirement' : 'Purchase'}
          </span>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">
          {transaction.carbon_credits.name}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {formatCurrency(transaction.total_amount)}
          </div>
          <div className="text-gray-500">
            {transaction.quantity} credits @ {formatCurrency(transaction.price_per_credit)}
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">
          {formatDate(transaction.created_at)}
        </span>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          transaction.status === 'completed'
            ? 'bg-green-100 text-green-800'
            : transaction.status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </span>
      </td>
    </tr>
  );
}