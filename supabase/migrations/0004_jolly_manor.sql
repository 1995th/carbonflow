/*
  # Add indexes and retirement tracking

  1. New Columns
    - Add `retired_amount` to carbon_credits table to track retired credits
    - Add `retirement_date` to user_portfolios table

  2. Indexes
    - Add indexes for frequently queried columns
    - Add composite indexes for common query patterns

  3. Changes
    - Update existing tables with new columns
    - Add appropriate indexes
*/

-- Add retired_amount to carbon_credits
ALTER TABLE carbon_credits 
ADD COLUMN retired_amount integer DEFAULT 0 CHECK (retired_amount >= 0);

-- Add retirement_date to user_portfolios
ALTER TABLE user_portfolios
ADD COLUMN retirement_date timestamptz;

-- Add indexes for better query performance
CREATE INDEX idx_carbon_credits_status ON carbon_credits(status);
CREATE INDEX idx_user_portfolios_user_status ON user_portfolios(user_id, status);
CREATE INDEX idx_transactions_user_type ON transactions(user_id, type);

-- Add composite indexes for common queries
CREATE INDEX idx_portfolio_lookup ON user_portfolios(user_id, credit_id, status);
CREATE INDEX idx_transaction_history ON transactions(user_id, created_at DESC);

-- Drop existing policy and create updated one
DROP POLICY IF EXISTS "Users can view own portfolio" ON user_portfolios;

CREATE POLICY "Users can view own portfolio"
ON user_portfolios
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);