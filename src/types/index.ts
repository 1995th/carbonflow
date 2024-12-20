export interface CarbonCredit {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  location: string;
  projectType: string;
  vintage: number;
  verificationStandard: string;
  imageUrl: string;
  status: 'available' | 'retired';
}

export interface Portfolio {
  id: string;
  user_id: string;
  credit_id: string;
  quantity: number;
  purchase_price: number;
  status: 'active' | 'retired';
  carbon_credits: {
    id: string;
    name: string;
    price: number;
    verification_standard: string;
  };
}

export interface Transaction {
  id: string;
  user_id: string;
  credit_id: string;
  type: 'purchase' | 'retirement';
  quantity: number;
  price_per_credit: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  carbon_credits: {
    id: string;
    name: string;
  };
}