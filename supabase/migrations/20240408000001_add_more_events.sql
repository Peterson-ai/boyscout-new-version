-- Insert two more events
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
  'b7c9d852-4567-8901-2345-def123456789',
  'Merit Badge Workshop',
  'Join us for an intensive weekend of merit badge work. Multiple counselors will be available for various badges including First Aid, Environmental Science, and Citizenship in the Community.',
  'Training',
  '2024-06-15',
  '2024-06-16',
  'Scout Training Center, Miami',
  75,
  12,
  'public/lovable-uploads/21caf5a2-65cb-46fb-ad61-4c8eb907c114.png'
),
(
  'c8d9e963-5678-9012-3456-ef1234567890',
  'Conservation Project',
  'Help preserve our local environment! Scouts will work on conservation efforts at the state park, including trail maintenance and invasive species removal.',
  'Service',
  '2024-05-25',
  '2024-05-25',
  'Everglades National Park',
  100,
  28,
  'public/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png'
);