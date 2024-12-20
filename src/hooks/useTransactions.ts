import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Transaction = Database['public']['Tables']['transactions']['Row'] & {
  carbon_credits: Database['public']['Tables']['carbon_credits']['Row']
};

export function useTransactions(userId: string | undefined) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  async function fetchTransactions() {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          carbon_credits (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }

  return { transactions, loading, error, refetch: fetchTransactions };
}