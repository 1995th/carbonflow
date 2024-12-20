import { supabase } from '../supabase';
import type { PurchaseParams } from '../web3/transactions/types';

export async function createPurchaseRecord({
  creditId,
  quantity,
  pricePerCredit
}: PurchaseParams, userId: string) {
  const totalAmount = quantity * pricePerCredit;

  const { error: txError } = await supabase.from('transactions').insert({
    user_id: userId,
    credit_id: creditId,
    type: 'purchase',
    quantity,
    price_per_credit: pricePerCredit,
    total_amount: totalAmount,
    status: 'completed'
  });

  if (txError) throw txError;

  const { error: portfolioError } = await supabase.from('user_portfolios').insert({
    user_id: userId,
    credit_id: creditId,
    quantity,
    purchase_price: pricePerCredit,
    status: 'active'
  });

  if (portfolioError) throw portfolioError;
}