import { CarbonMarket } from '../contracts/CarbonMarket';
import { MARKET_ADDRESS } from '../constants';
import { getProvider, getSigner } from '../providers';
import type { TransactionResult } from './types';

export async function executePurchaseTransaction(
  creditId: string,
  quantity: number
): Promise<TransactionResult> {
  try {
    const provider = await getProvider();
    const signer = await getSigner();
    const market = new CarbonMarket(MARKET_ADDRESS, provider);

    const tx = await market.purchaseCredits(creditId, quantity.toString(), signer);
    await tx.wait();
    return { success: true, hash: tx.hash };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Purchase transaction failed'
    };
  }
}