import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWeb3 } from '../../lib/web3/hooks';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAccountModal({ isOpen, onClose }: CreateAccountModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const { address } = useWeb3();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, address);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
              required
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Connected Wallet</p>
            <p className="font-mono text-sm">{address}</p>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}