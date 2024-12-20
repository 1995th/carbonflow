import React from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { DashboardOverview } from './pages/DashboardOverview';
import { DashboardMarketplace } from './pages/DashboardMarketplace';
import { DashboardPortfolio } from './pages/DashboardPortfolio';
import { DashboardHistory } from './pages/DashboardHistory';

export function DashboardContent() {
  const { currentPath } = useNavigation();

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      {currentPath === '/dashboard' && <DashboardOverview />}
      {currentPath === '/dashboard/marketplace' && <DashboardMarketplace />}
      {currentPath === '/dashboard/portfolio' && <DashboardPortfolio />}
      {currentPath === '/dashboard/history' && <DashboardHistory />}
    </main>
  );
}