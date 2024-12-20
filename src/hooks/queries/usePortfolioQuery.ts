import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import type { Portfolio } from '../../types';

export const portfolioQueryKey = (userId: string) => ['portfolio', userId];

async function fetchPortfolio(userId: string) {
  const { data, error } = await supabase
    .from('user_portfolios')
    .select(`
      *,
      carbon_credits (*)
    `)
    .eq('user_id', userId);

  if (error) throw error;
  return data as Portfolio[];
}

export function usePortfolioQuery(userId: string | undefined) {
  return useQuery({
    queryKey: portfolioQueryKey(userId ?? ''),
    queryFn: () => fetchPortfolio(userId!),
    enabled: !!userId,
  });
}