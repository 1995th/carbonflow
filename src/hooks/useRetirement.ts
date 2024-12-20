import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import { useCarbonContract } from '../lib/web3/hooks/useCarbonContract';

export function useRetirement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const { executeTransaction } = useCarbonContract();

  const retireCredits = async (portfolioId: string, quantity: number) => {
    if (!user) throw new Error('User not authenticated');
    setLoading(true);
    setError(null);

    try {
      // Get portfolio entry
      const { data: portfolio, error: portfolioError } = await supabase
        .from('user_portfolios')
        .select('*, carbon_credits(*)')
        .eq('id', portfolioId)
        .single();

      if (portfolioError) throw portfolioError;
      if (!portfolio) throw new Error('Portfolio entry not found');

      // Execute blockchain transaction
      const success = await executeTransaction(
        'retire',
        portfolio.credit_id,
        quantity.toString()
      );

      if (!success) throw new Error('Blockchain transaction failed');

      // Start database updates
      const { error: updateError } = await supabase.rpc('retire_credits', {
        p_portfolio_id: portfolioId,
        p_quantity: quantity,
        p_user_id: user.id
      });

      if (updateError) throw updateError;

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to retire credits');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    retireCredits,
    loading,
    error
  };
}