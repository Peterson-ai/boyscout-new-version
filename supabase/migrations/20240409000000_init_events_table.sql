-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing events table if it exists
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS events;

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Camp', 'Ceremony', 'Service', 'Training')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  max_registrations INTEGER NOT NULL CHECK (max_registrations > 0),
  current_registrations INTEGER DEFAULT 0 CHECK (current_registrations >= 0),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_registration_count CHECK (current_registrations <= max_registrations)
);

-- Create event registrations table
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, user_id)
);

-- Insert initial events data
INSERT INTO events (
  id,
  title,
  description,
  type,
  start_date,
  end_date,
  location,
  max_registrations,
  current_registrations,
  image_url
) VALUES
(
  'e7d6a940-1234-4567-8901-abcdef123456',
  'Summer Camp 2024',
  'Annual summer camp at Camp Crystal Lake. Join us for a week of outdoor adventures, skill-building, and fun!',
  'Camp',
  '2024-07-14T00:00:00Z',
  '2024-07-22T00:00:00Z',
  'Camp Crystal Lake, Pine Valley',
  150,
  87,
  'public/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png'
),
(
  'f8e7b951-2345-5678-9012-bcdef1234567',
  'Eagle Scout Ceremony',
  'Celebration ceremony for our newest Eagle Scouts. Family and Friends welcome!',
  'Ceremony',
  '2024-05-17T14:00:00Z',
  '2024-05-17T17:00:00Z',
  'Community Center, Downtown',
  200,
  54,
  'public/lovable-uploads/d73c5a4d-124a-4e2e-b3e8-4af49f90719d.png'
),
(
  'a9f8c962-3456-6789-0123-cdef12345678',
  'Community Service Day',
  'Join us for a day of giving back to our community through various service projects.',
  'Service',
  '2024-05-14T09:00:00Z',
  '2024-05-14T16:00:00Z',
  'City Park',
  50,
  45,
  'public/lovable-uploads/f228ec90-d0f3-4470-85f2-f90cbc734b6d.png'
),
(
  'd9e0f074-6789-0123-4567-f12345678901',
  'Winter Adventure Camp',
  'Experience an exciting winter camping adventure! Activities include winter survival skills, snow hiking, and cold weather first aid training. Indoor heated facilities available.',
  'Camp',
  '2024-12-10T00:00:00Z',
  '2024-12-15T00:00:00Z',
  'Mountain Ridge Scout Camp',
  80,
  15,
  'public/lovable-uploads/d73c5a4d-124a-4e2e-b3e8-4af49f90719d.png'
),
(
  'e0f1g185-7890-1234-5678-g23456789012',
  'Eagle Scout Court of Honor',
  'Join us in celebrating our newest Eagle Scouts! This formal ceremony recognizes the outstanding achievements of Scouts who have earned Scouting's highest rank.',
  'Ceremony',
  '2024-08-20T18:00:00Z',
  '2024-08-20T21:00:00Z',
  'Grand Scout Hall, Downtown',
  250,
  42,
  'public/lovable-uploads/f228ec90-d0f3-4470-85f2-f90cbc734b6d.png'
);

-- Add RLS policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "Enable read access for all users" ON events
  FOR SELECT USING (true);

-- Event registrations policies
CREATE POLICY "Enable read access for authenticated users" ON event_registrations
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Enable insert for authenticated users" ON event_registrations
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND
    auth.uid() = user_id
  );

-- Add trigger for updating current_registrations
CREATE OR REPLACE FUNCTION update_event_registration_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events 
    SET current_registrations = current_registrations + 1
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events 
    SET current_registrations = current_registrations - 1
    WHERE id = OLD.event_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_registration_count
AFTER INSERT OR DELETE ON event_registrations
FOR EACH ROW
EXECUTE FUNCTION update_event_registration_count();