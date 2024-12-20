export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateQuantity(
  quantity: number,
  available: number,
  minQuantity = 1
): ValidationResult {
  if (isNaN(quantity)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  if (quantity < minQuantity) {
    return { isValid: false, error: `Minimum quantity is ${minQuantity}` };
  }
  
  if (quantity > available) {
    return { isValid: false, error: `Maximum available quantity is ${available}` };
  }
  
  return { isValid: true };
}

export function validateTransaction(
  quantity: number,
  available: number,
  walletBalance: string
): ValidationResult {
  const quantityValidation = validateQuantity(quantity, available);
  if (!quantityValidation.isValid) {
    return quantityValidation;
  }

  const balance = parseFloat(walletBalance);
  if (isNaN(balance) || balance <= 0) {
    return { isValid: false, error: 'Insufficient wallet balance' };
  }

  return { isValid: true };
}