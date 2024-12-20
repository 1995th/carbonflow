import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Portfolio = Database['public']['Tables']['user_portfolios']['Row'] & {
  carbon_credits: Database['public']['Tables']['carbon_credits']['Row']
};

export function usePortfolio(userId: string | undefined) {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (userId) {
      fetchPortfolio();
    }
  }, [userId]);

  async function fetchPortfolio() {
    try {
      const { data, error } = await supabase
        .from('user_portfolios')
        .select(`
          *,
          carbon_credits (*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      setPortfolio(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }

  return { portfolio, loading, error, refetch: fetchPortfolio };
}