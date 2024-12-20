/*
  # Add wallet address and retirement functionality

  1. Changes
    - Add wallet_address column to user metadata
    - Add retire_credits function for handling credit retirement
  
  2. Security
    - Function runs with SECURITY DEFINER to ensure proper access control
    - Validates user ownership and credit availability
*/

-- Add wallet_address to auth.users
DO $$ 
BEGIN
  ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS wallet_address text;
  EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Drop the function if it exists to ensure clean state
DROP FUNCTION IF EXISTS retire_credits(uuid, integer, uuid);

CREATE OR REPLACE FUNCTION retire_credits(
  p_portfolio_id uuid,
  p_quantity integer,
  p_user_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_credit_id uuid;
  v_available_quantity integer;
BEGIN
  -- Get portfolio information and validate ownership with row-level locking
  SELECT credit_id, quantity
  INTO v_credit_id, v_available_quantity
  FROM user_portfolios
  WHERE id = p_portfolio_id
    AND user_id = p_user_id
    AND status = 'active'
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid portfolio entry or insufficient permissions';
  END IF;

  IF v_available_quantity < p_quantity THEN
    RAISE EXCEPTION 'Insufficient credits available for retirement';
  END IF;

  -- Update portfolio entry
  UPDATE user_portfolios
  SET 
    quantity = quantity - p_quantity,
    status = CASE 
      WHEN quantity - p_quantity = 0 THEN 'retired'
      ELSE status 
    END,
    retirement_date = CASE 
      WHEN quantity - p_quantity = 0 THEN now()
      ELSE retirement_date 
    END
  WHERE id = p_portfolio_id;

  -- Create retirement transaction record
  INSERT INTO transactions (
    user_id,
    credit_id,
    type,
    quantity,
    price_per_credit,
    total_amount,
    status
  )
  SELECT
    p_user_id,
    v_credit_id,
    'retirement',
    p_quantity,
    price,
    price * p_quantity,
    'completed'
  FROM carbon_credits
  WHERE id = v_credit_id;

  -- Update carbon credits retired amount
  UPDATE carbon_credits
  SET retired_amount = COALESCE(retired_amount, 0) + p_quantity
  WHERE id = v_credit_id;
END;
$$;