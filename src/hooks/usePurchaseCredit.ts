import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface PurchaseParams {
  creditId: string;
  quantity: number;
  pricePerCredit: number;
  totalAmount: number;
}

export function usePurchaseCredit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const purchaseCredit = async ({ creditId, quantity, pricePerCredit, totalAmount }: PurchaseParams) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Start transaction
      const { data: credit, error: creditError } = await supabase
        .from('carbon_credits')
        .select('quantity')
        .eq('id', creditId)
        .single();

      if (creditError) throw creditError;
      if (!credit) throw new Error('Credit not found');
      if (credit.quantity < quantity) throw new Error('Insufficient credits available');

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          credit_id: creditId,
          type: 'purchase',
          quantity,
          price_per_credit: pricePerCredit,
          total_amount: totalAmount,
          status: 'completed'
        });

      if (transactionError) throw transactionError;

      // Update credit quantity
      const { error: updateError } = await supabase
        .from('carbon_credits')
        .update({ quantity: credit.quantity - quantity })
        .eq('id', creditId);

      if (updateError) throw updateError;

      // Add to user's portfolio
      const { error: portfolioError } = await supabase
        .from('user_portfolios')
        .insert({
          user_id: user.id,
          credit_id: creditId,
          quantity,
          purchase_price: pricePerCredit,
          status: 'active'
        });

      if (portfolioError) throw portfolioError;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process purchase');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { purchaseCredit, loading, error };
}