export interface TransactionResult {
  success: boolean;
  error?: string;
  hash?: string;
}

export interface PurchaseParams {
  creditId: string;
  quantity: number;
  pricePerCredit: number;
}