import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Briefcase, History, Menu, X } from 'lucide-react';

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/dashboard/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { path: '/dashboard/portfolio', icon: Briefcase, label: 'Portfolio' },
    { path: '/dashboard/history', icon: History, label: 'History' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-16 z-40
        w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)]
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <nav className="p-4 space-y-1">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                location.pathname === path
                  ? 'bg-emerald-50 text-emerald-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}