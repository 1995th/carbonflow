import { USDCToken } from '../contracts/USDCToken';
import { MARKET_ADDRESS, USDC_ADDRESS } from '../constants';
import { getProvider, getSigner } from '../providers';
import type { TransactionResult } from './types';

export async function checkAndApproveUSDC(
  amount: number,
  userAddress: string
): Promise<TransactionResult> {
  try {
    const provider = await getProvider();
    const signer = await getSigner();
    const usdc = new USDCToken(USDC_ADDRESS, provider);

    const allowance = await usdc.getAllowance(userAddress, MARKET_ADDRESS);
    if (Number(allowance) >= amount) {
      return { success: true };
    }

    const tx = await usdc.approve(MARKET_ADDRESS, amount.toString(), signer);
    await tx.wait();
    return { success: true, hash: tx.hash };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Failed to approve USDC'
    };
  }
}