import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type CarbonCredit = Database['public']['Tables']['carbon_credits']['Row'];

export function useCredits() {
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCredits();
  }, []);

  async function fetchCredits() {
    try {
      const { data, error } = await supabase
        .from('carbon_credits')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCredits(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }

  return { credits, loading, error, refetch: fetchCredits };
}