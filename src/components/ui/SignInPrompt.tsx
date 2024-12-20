import React from 'react';
import { LogIn } from 'lucide-react';

export function SignInPrompt() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <LogIn className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to view your portfolio</h3>
      <p className="text-gray-600">Connect your wallet to see your carbon credits and trading history.</p>
    </div>
  );
}