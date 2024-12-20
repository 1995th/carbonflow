import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import type { CarbonCredit } from '../types';

export function useWatchlist() {
  const { user } = useAuthContext();
  const [watchlist, setWatchlist] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const fetchWatchlist = async () => {
    try {
      const { data, error } = await supabase
        .from('credit_watchlist')
        .select(`
          credit_id,
          carbon_credits (*)
        `)
        .eq('user_id', user?.id);

      if (error) throw error;
      setWatchlist(data?.map(item => item.carbon_credits) || []);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to fetch watchlist'));
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = async (creditId: string) => {
    try {
      const { error } = await supabase
        .from('credit_watchlist')
        .insert({ user_id: user?.id, credit_id: creditId });

      if (error) throw error;
      await fetchWatchlist();
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to add to watchlist'));
    }
  };

  const removeFromWatchlist = async (creditId: string) => {
    try {
      const { error } = await supabase
        .from('credit_watchlist')
        .delete()
        .eq('user_id', user?.id)
        .eq('credit_id', creditId);

      if (error) throw error;
      await fetchWatchlist();
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to remove from watchlist'));
    }
  };

  return {
    watchlist,
    loading,
    error,
    addToWatchlist,
    removeFromWatchlist
  };
}