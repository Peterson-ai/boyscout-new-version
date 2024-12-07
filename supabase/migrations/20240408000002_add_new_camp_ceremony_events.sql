-- Insert two more events (Camp and Ceremony types)
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
  'd9e0f074-6789-0123-4567-f12345678901',
  'Winter Adventure Camp',
  'Experience an exciting winter camping adventure! Activities include winter survival skills, snow hiking, and cold weather first aid training. Indoor heated facilities available.',
  'Camp',
  '2024-12-10',
  '2024-12-15',
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
  '2024-08-20',
  '2024-08-20',
  'Grand Scout Hall, Downtown',
  250,
  42,
  'public/lovable-uploads/f228ec90-d0f3-4470-85f2-f90cbc734b6d.png'
);