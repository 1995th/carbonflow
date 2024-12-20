import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-[1920px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}