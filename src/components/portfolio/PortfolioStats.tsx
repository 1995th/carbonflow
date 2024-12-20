import { usePortfolioStats } from '../../hooks/usePortfolioStats';
import { StatsCard } from './StatsCard';
import { Wallet, TrendingUp, TreePine } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export function PortfolioStats() {
  const { stats } = usePortfolioStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        icon={<Wallet className="h-6 w-6 text-emerald-600" />}
        label="Total Value"
        value={formatCurrency(stats.totalValue)}
      />
      <StatsCard
        icon={<TrendingUp className="h-6 w-6 text-emerald-600" />}
        label="Total Profit/Loss"
        value={formatCurrency(stats.totalProfitLoss)}
        subValue={`${stats.totalProfitLossPercentage.toFixed(2)}%`}
        valueColor={stats.totalProfitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}
      />
      <StatsCard
        icon={<TreePine className="h-6 w-6 text-emerald-600" />}
        label="Total Credits"
        value={stats.totalCredits.toString()}
      />
    </div>
  );
}