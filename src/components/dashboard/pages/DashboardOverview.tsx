import React from 'react';
import { usePortfolioStats } from '../../../hooks/usePortfolioStats';
import { WatchlistSection } from '../WatchlistSection';
import { formatCurrency } from '../../../utils/format';

export function DashboardOverview() {
  const { stats } = usePortfolioStats();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Total Portfolio Value"
          value={formatCurrency(stats.totalValue)}
          description="Current market value of all credits"
        />
        <StatCard
          title="Total Profit/Loss"
          value={formatCurrency(stats.totalProfitLoss)}
          description={`${stats.totalProfitLossPercentage.toFixed(2)}% overall return`}
          valueColor={stats.totalProfitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}
        />
        <StatCard
          title="Active Credits"
          value={stats.totalCredits.toString()}
          description="Total carbon credits owned"
        />
      </div>

      <WatchlistSection />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  valueColor?: string;
}

function StatCard({ title, value, description, valueColor = 'text-gray-900' }: StatCardProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className={`text-xl sm:text-2xl font-semibold mt-2 ${valueColor}`}>{value}</p>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}