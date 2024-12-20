import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { PortfolioList } from './PortfolioList';
import { PortfolioStats } from './PortfolioStats';
import { SignInPrompt } from '../ui/SignInPrompt';

export function PortfolioSection() {
  const { user } = useAuthContext();

  if (!user) {
    return <SignInPrompt />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Portfolio</h2>
      <PortfolioStats />
      <PortfolioList />
    </section>
  );
}