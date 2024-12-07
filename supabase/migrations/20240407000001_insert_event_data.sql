-- Insert sample event data
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
  '2024-07-14',
  '2024-07-22',
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
  '2024-05-17',
  '2024-05-17',
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
  '2024-05-14',
  '2024-05-14',
  'City Park',
  50,
  45,
  'public/lovable-uploads/f228ec90-d0f3-4470-85f2-f90cbc734b6d.png'
);