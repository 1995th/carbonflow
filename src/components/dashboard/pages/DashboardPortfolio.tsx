import React from 'react';
import { PortfolioList } from '../../portfolio/PortfolioList';
import { PortfolioStats } from '../../portfolio/PortfolioStats';

export function DashboardPortfolio() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Your Portfolio</h2>
      <PortfolioStats />
      <PortfolioList />
    </div>
  );
}