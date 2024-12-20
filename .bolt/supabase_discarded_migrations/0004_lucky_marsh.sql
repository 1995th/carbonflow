/*
  # Add User Preferences and Update Indexes

  1. Changes
    - Add retired_amount tracking
    - Add retirement date tracking
    - Add user preferences table
    - Add credit watchlist functionality
    - Add performance indexes

  2. Security
    - Enable RLS on new tables
    - Add policies for user access
*/

-- Add retired_amount to carbon_credits if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'carbon_credits' 
        AND column_name = 'retired_amount') 
    THEN
        ALTER TABLE carbon_credits 
        ADD COLUMN retired_amount integer DEFAULT 0 CHECK (retired_amount >= 0);
    END IF;
END $$;

-- Add retirement_date to user_portfolios if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_portfolios' 
        AND column_name = 'retirement_date') 
    THEN
        ALTER TABLE user_portfolios
        ADD COLUMN retirement_date timestamptz;
    END IF;
END $$;

-- Add profile_completed to auth.users if not exists
DO $$ 
BEGIN
    ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS profile_completed boolean DEFAULT false;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Create User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    theme text DEFAULT 'light',
    email_notifications boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

-- Create Credit Watchlist Table
CREATE TABLE IF NOT EXISTS credit_watchlist (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    credit_id uuid REFERENCES carbon_credits NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, credit_id)
);

-- Enable RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_watchlist ENABLE ROW LEVEL SECURITY;

-- Create indexes if they don't exist
DO $$ 
BEGIN
    -- Carbon Credits indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_carbon_credits_status') THEN
        CREATE INDEX idx_carbon_credits_status ON carbon_credits(status);
    END IF;

    -- User Portfolios indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_portfolios_user_status') THEN
        CREATE INDEX idx_user_portfolios_user_status ON user_portfolios(user_id, status);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_portfolio_lookup') THEN
        CREATE INDEX idx_portfolio_lookup ON user_portfolios(user_id, credit_id, status);
    END IF;

    -- Transactions indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_transactions_user_type') THEN
        CREATE INDEX idx_transactions_user_type ON transactions(user_id, type);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_transaction_history') THEN
        CREATE INDEX idx_transaction_history ON transactions(user_id, created_at DESC);
    END IF;

    -- User Preferences and Watchlist indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_preferences_user_id') THEN
        CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_credit_watchlist_user_id') THEN
        CREATE INDEX idx_credit_watchlist_user_id ON credit_watchlist(user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_credit_watchlist_credit_id') THEN
        CREATE INDEX idx_credit_watchlist_credit_id ON credit_watchlist(credit_id);
    END IF;
END $$;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
    DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
    DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;
    DROP POLICY IF EXISTS "Users can view own watchlist" ON credit_watchlist;
    DROP POLICY IF EXISTS "Users can manage own watchlist" ON credit_watchlist;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

-- Add policies
CREATE POLICY "Users can view own preferences"
    ON user_preferences FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
    ON user_preferences FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
    ON user_preferences FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own watchlist"
    ON credit_watchlist FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own watchlist"
    ON credit_watchlist FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Add updated_at trigger for user_preferences
CREATE OR REPLACE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();