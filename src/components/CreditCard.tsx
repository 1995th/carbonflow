import React, { useState } from 'react';
import { TreePine, MapPin, BadgeCheck } from 'lucide-react';
import { PurchaseModal } from './purchase/PurchaseModal';
import { useAuthContext } from '../contexts/AuthContext';
import type { CarbonCredit } from '../types';
import { formatCurrency } from '../utils/format';

interface CreditCardProps {
  credit: CarbonCredit;
}

export function CreditCard({ credit }: CreditCardProps) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { user } = useAuthContext();

  const handlePurchaseClick = () => {
    if (!user) {
      alert('Please sign in to purchase credits');
      return;
    }
    setShowPurchaseModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden h-full flex flex-col">
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{credit.name}</h3>
              <div className="flex-shrink-0 flex items-center bg-emerald-50 px-3 py-1 rounded-full">
                <TreePine className="h-4 w-4 text-emerald-600 mr-1" />
                <span className="text-sm font-medium text-emerald-600 whitespace-nowrap">
                  {credit.projectType}
                </span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{credit.location}</span>
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            <p className="text-gray-600">{credit.description}</p>
            <div className="flex items-center text-gray-600">
              <BadgeCheck className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{credit.verificationStandard}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(credit.price)}</p>
              <p className="text-sm text-gray-600">per credit</p>
            </div>
            <button
              onClick={handlePurchaseClick}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>

      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        credit={credit}
      />
    </>
  );
}