-- Supabase Database Schema for Gorilla Labs
-- Run this SQL in your Supabase SQL Editor

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service_interest TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AI interactions table for tracking AI usage
CREATE TABLE IF NOT EXISTS ai_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  interaction_type TEXT NOT NULL,
  input_text TEXT,
  output_text TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_ai_interactions_user_id ON ai_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_interactions_type ON ai_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_ai_interactions_created_at ON ai_interactions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for contacts table
-- Allow anyone to insert contacts (for contact form)
CREATE POLICY "Allow public insert on contacts"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read their own contacts
CREATE POLICY "Allow authenticated read on contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for leads table
-- Allow anyone to insert leads
CREATE POLICY "Allow public insert on leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users to read leads
CREATE POLICY "Allow authenticated read on leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for ai_interactions table
-- Allow authenticated users to insert their own interactions
CREATE POLICY "Allow authenticated insert on ai_interactions"
  ON ai_interactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Allow authenticated users to read their own interactions
CREATE POLICY "Allow authenticated read on ai_interactions"
  ON ai_interactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

