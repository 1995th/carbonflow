import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWeb3 } from '../../lib/web3/hooks';
import { useAuthForm } from '../../hooks/auth/useAuthForm';
import { LoadingOverlay } from '../ui/LoadingOverlay';
import { AuthInput } from './components/AuthInput';
import { AuthError } from './components/AuthError';
import { AuthButton } from './components/AuthButton';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}

export function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const { isConnecting, error, setError, handleWalletConnection, isConnected } = useAuthForm();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const connected = await handleWalletConnection();
    if (!connected) return;

    try {
      await signIn(email, password);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        {isConnecting && <LoadingOverlay message="Connecting wallet..." />}
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthError message={error} />
          
          <AuthInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <AuthInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <AuthButton isConnected={isConnected}>
            Sign In
          </AuthButton>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToSignUp}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}