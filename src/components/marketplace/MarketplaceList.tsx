import React from 'react';
import { useCredits } from '../../hooks/useCredits';
import { CreditCard } from '../CreditCard';
import { Loader } from '../ui/Loader';
import { ErrorMessage } from '../ui/ErrorMessage';

export function MarketplaceList() {
  const { credits, loading, error } = useCredits();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {credits.map((credit) => (
        <CreditCard
          key={credit.id}
          credit={{
            ...credit,
            projectType: credit.project_type,
            imageUrl: credit.image_url,
            verificationStandard: credit.verification_standard
          }}
          onPurchase={() => {}} // Will be implemented in the next step
        />
      ))}
    </div>
  );
}