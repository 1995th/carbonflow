/*
  # Initial Schema Setup for Carbon Credit Marketplace

  1. New Tables
    - `carbon_credits`
      - Stores carbon credit project information
      - Includes verification, location, and pricing details
    - `user_portfolios`
      - Tracks user's credit holdings
      - Links users to their purchased credits
    - `transactions`
      - Records all credit purchases and retirements
      - Maintains audit trail of all marketplace activity

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to:
      - View all available credits
      - View their own portfolio
      - Create transactions for their account
*/

-- Carbon Credits Table
CREATE TABLE carbon_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price > 0),
  quantity integer NOT NULL CHECK (quantity >= 0),
  location text NOT NULL,
  project_type text NOT NULL,
  vintage integer NOT NULL,
  verification_standard text NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL CHECK (status IN ('available', 'retired')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Portfolios Table
CREATE TABLE user_portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  credit_id uuid REFERENCES carbon_credits NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  purchase_price numeric(10,2) NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'retired')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Transactions Table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  credit_id uuid REFERENCES carbon_credits NOT NULL,
  type text NOT NULL CHECK (type IN ('purchase', 'retirement')),
  quantity integer NOT NULL CHECK (quantity > 0),
  price_per_credit numeric(10,2) NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE carbon_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies for carbon_credits
CREATE POLICY "Anyone can view available credits"
  ON carbon_credits
  FOR SELECT
  USING (true);

-- Policies for user_portfolios
CREATE POLICY "Users can view own portfolio"
  ON user_portfolios
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create portfolio entries"
  ON user_portfolios
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for transactions
CREATE POLICY "Users can view own transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_carbon_credits_updated_at
  BEFORE UPDATE ON carbon_credits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_portfolios_updated_at
  BEFORE UPDATE ON user_portfolios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();