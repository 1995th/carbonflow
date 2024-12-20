/*
  # Add User Preferences and Watchlist Features

  1. Changes
    - Add profile completion tracking to auth.users
    - Add user preferences table for theme and notification settings
    - Add credit watchlist table for saved credits
    - Add appropriate indexes and policies

  2. Security
    - Enable RLS on new tables
    - Add policies for user access control
*/

-- Add profile_completed to auth.users if it doesn't exist
DO $$ 
BEGIN
  ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS profile_completed boolean DEFAULT false;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Create User Preferences Table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  theme text DEFAULT 'light',
  email_notifications boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create Credit Watchlist Table if it doesn't exist
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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_watchlist_user_id ON credit_watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_watchlist_credit_id ON credit_watchlist(credit_id);

-- Policies for user_preferences
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
  DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
  DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;

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
END $$;

-- Policies for credit_watchlist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view own watchlist" ON credit_watchlist;
  DROP POLICY IF EXISTS "Users can manage own watchlist" ON credit_watchlist;

  CREATE POLICY "Users can view own watchlist"
    ON credit_watchlist FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can manage own watchlist"
    ON credit_watchlist FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
END $$;

-- Add updated_at trigger for user_preferences
DO $$ 
BEGIN
  DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
  
  CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
END $$;