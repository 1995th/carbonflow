import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import type { CarbonCredit } from '../../types';

export const creditsQueryKey = ['credits'];

async function fetchCredits() {
  const { data, error } = await supabase
    .from('carbon_credits')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as CarbonCredit[];
}

export function useCreditsQuery() {
  return useQuery({
    queryKey: creditsQueryKey,
    queryFn: fetchCredits,
  });
}