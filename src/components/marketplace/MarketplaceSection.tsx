import React from 'react';
import { MarketplaceList } from './MarketplaceList';

export function MarketplaceSection() {
  return (
    <section id="marketplace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Available Credits</h2>
        <p className="mt-2 text-gray-600">Browse verified carbon credits from various projects worldwide.</p>
      </div>
      <MarketplaceList />
    </section>
  );
}