/*
  # Add retire_credits function

  1. New Function
    - Creates a stored procedure for retiring carbon credits
    - Handles portfolio updates, transaction records, and credit retirement
    - Includes validation and error handling
    - Uses row-level locking to prevent race conditions

  2. Security
    - Function runs with SECURITY DEFINER
    - Validates user ownership and permissions
    - Checks available quantities
*/

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
  -- Get portfolio information and validate ownership
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
  SET retired_amount = retired_amount + p_quantity
  WHERE id = v_credit_id;
END;
$$;