import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useWeb3 } from '../../lib/web3/hooks';
import { Wallet, LogOut } from 'lucide-react';

export function DashboardHeader() {
  const { signOut } = useAuthContext();
  const { address, isConnected } = useWeb3();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
              <Wallet className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Not Connected'}
              </span>
            </div>
            
            <button
              onClick={signOut}
              className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}