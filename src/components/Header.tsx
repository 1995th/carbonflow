import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Wallet } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useWeb3 } from '../lib/web3/hooks';
import { SignInModal } from './auth/SignInModal';
import { SignUpModal } from './auth/SignUpModal';
import { CreateAccountModal } from './auth/CreateAccountModal';

export function Header() {
  const { user, signOut } = useAuthContext();
  const { isConnected, address, connectWallet, disconnect } = useWeb3();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleWalletClick = async () => {
    if (isConnected) {
      await disconnect();
      if (user) await signOut();
    } else {
      await connectWallet();
      if (!user) {
        setShowSignIn(true);
      }
    }
  };

  const handleAuthModalClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setShowCreateAccount(false);
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Sprout className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">CarbonFlow</span>
            </Link>
            
            <nav className="flex items-center space-x-8">
              <Link to="/dashboard/marketplace" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Marketplace
              </Link>
              {user && (
                <>
                  <Link to="/dashboard/portfolio" className="text-gray-700 hover:text-emerald-600 transition-colors">
                    Portfolio
                  </Link>
                  <Link to="/dashboard/history" className="text-gray-700 hover:text-emerald-600 transition-colors">
                    History
                  </Link>
                </>
              )}
              <button
                onClick={handleWalletClick}
                className="flex items-center px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnected ? 
                  `${address?.slice(0, 6)}...${address?.slice(-4)}` : 
                  'Connect Wallet'
                }
              </button>
            </nav>
          </div>
        </div>
      </header>

      <SignInModal
        isOpen={showSignIn}
        onClose={handleAuthModalClose}
        onSwitchToSignUp={() => {
          setShowSignIn(false);
          setShowSignUp(true);
        }}
      />

      <SignUpModal
        isOpen={showSignUp}
        onClose={handleAuthModalClose}
        onSwitchToSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />

      <CreateAccountModal
        isOpen={showCreateAccount}
        onClose={handleAuthModalClose}
      />
    </>
  );
}