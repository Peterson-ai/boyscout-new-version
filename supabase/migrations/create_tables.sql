-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name TEXT,
  last_name TEXT,
  organization TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create policy to allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  goal NUMERIC NOT NULL,
  raised NUMERIC DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create donors table
CREATE TABLE donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appeal_code TEXT,
  year INTEGER,
  appeal_name TEXT,
  structure TEXT,
  giving_category TEXT,
  last_name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip TEXT,
  email TEXT,
  donation_amount NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies for donors
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;

-- Policies for donors
CREATE POLICY "Enable read access for authenticated users" ON donors
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON donors
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for admin users" ON donors
  FOR UPDATE USING (auth.role() = 'authenticated' AND auth.jwt()->>'role' = 'admin');

-- Create donations table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES donors(id),
  campaign_id UUID REFERENCES campaigns(id),
  amount NUMERIC NOT NULL,
  frequency TEXT,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  transaction_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON donations;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON donations;
DROP POLICY IF EXISTS "Enable update for own donations" ON donations;
DROP POLICY IF EXISTS "Enable delete for own donations" ON donations;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users" ON donations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON donations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for own donations" ON donations
  FOR UPDATE USING (
    auth.role() = 'authenticated' AND 
    donor_id IN (
      SELECT id FROM donors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Enable delete for own donations" ON donations
  FOR DELETE USING (
    auth.role() = 'authenticated' AND 
    donor_id IN (
      SELECT id FROM donors WHERE user_id = auth.uid()
    )
  );

-- Create functions to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_campaigns_updated_at
    BEFORE UPDATE ON campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donors_updated_at
    BEFORE UPDATE ON donors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at
    BEFORE UPDATE ON donations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
