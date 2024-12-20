import { useMemo } from 'react';
import { usePortfolio } from './usePortfolio';
import { useAuthContext } from '../contexts/AuthContext';

export function usePortfolioStats() {
  const { user } = useAuthContext();
  const { portfolio } = usePortfolio(user?.id);

  const stats = useMemo(() => {
    const initialStats = {
      totalValue: 0,
      totalCost: 0,
      totalCredits: 0,
      totalProfitLoss: 0,
      totalProfitLossPercentage: 0,
    };

    if (!portfolio.length) return initialStats;

    const calculated = portfolio.reduce((acc, item) => {
      const currentValue = item.quantity * item.carbon_credits.price;
      const cost = item.quantity * item.purchase_price;

      return {
        totalValue: acc.totalValue + currentValue,
        totalCost: acc.totalCost + cost,
        totalCredits: acc.totalCredits + item.quantity,
      };
    }, initialStats);

    const profitLoss = calculated.totalValue - calculated.totalCost;
    const profitLossPercentage = (profitLoss / calculated.totalCost) * 100;

    return {
      ...calculated,
      totalProfitLoss: profitLoss,
      totalProfitLossPercentage: profitLossPercentage || 0,
    };
  }, [portfolio]);

  return { stats };
}