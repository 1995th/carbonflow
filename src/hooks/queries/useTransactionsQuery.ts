import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import type { Transaction } from '../../types';

const PAGE_SIZE = 10;

export const transactionsQueryKey = (userId: string) => ['transactions', userId];

async function fetchTransactions(userId: string, page: number) {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      carbon_credits (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

  if (error) throw error;
  return {
    transactions: data as Transaction[],
    hasMore: data.length === PAGE_SIZE,
  };
}

export function useTransactionsQuery(userId: string | undefined) {
  return useInfiniteQuery({
    queryKey: transactionsQueryKey(userId ?? ''),
    queryFn: ({ pageParam = 0 }) => fetchTransactions(userId!, pageParam),
    getNextPageParam: (lastPage, pages) => 
      lastPage.hasMore ? pages.length : undefined,
    enabled: !!userId,
  });
}