import React, { useState } from 'react';
import { TreePine, BadgeCheck, Leaf } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { RetireModal } from './RetireModal';
import type { Portfolio } from '../../types';

interface PortfolioCardProps {
  portfolioItem: Portfolio;
}

export function PortfolioCard({ portfolioItem }: PortfolioCardProps) {
  const [showRetireModal, setShowRetireModal] = useState(false);
  const { carbon_credits: credit, quantity, purchase_price } = portfolioItem;
  const totalValue = quantity * credit.price;
  const totalCost = quantity * purchase_price;
  const profitLoss = totalValue - totalCost;
  const profitLossPercentage = ((totalValue - totalCost) / totalCost) * 100;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{credit.name}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <BadgeCheck className="h-4 w-4 mr-1" />
                <span className="text-sm">{credit.verification_standard}</span>
              </div>
            </div>
            <div className="flex items-center bg-emerald-50 px-3 py-1 rounded-full">
              <TreePine className="h-4 w-4 text-emerald-600 mr-1" />
              <span className="text-sm font-medium text-emerald-600">{quantity} Credits</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Purchase Price</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(purchase_price)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Price</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(credit.price)}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Profit/Loss</p>
                  <p className={`text-lg font-semibold ${profitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatCurrency(profitLoss)} ({profitLossPercentage.toFixed(2)}%)
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowRetireModal(true)}
              className="w-full mt-4 py-2 px-4 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Retire Credits
            </button>
          </div>
        </div>
      </div>

      <RetireModal
        isOpen={showRetireModal}
        onClose={() => setShowRetireModal(false)}
        portfolioItem={portfolioItem}
      />
    </>
  );
}