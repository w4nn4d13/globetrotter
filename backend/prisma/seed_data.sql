-- GlobalTrotters Seed Data
-- Run this AFTER the schema migration in Supabase SQL Editor

-- Insert Cities (letting PostgreSQL auto-generate UUIDs)
INSERT INTO cities (name, country, cost_index, popularity, image_url) VALUES
('Paris', 'France', 8, 95, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'),
('Rome', 'Italy', 7, 92, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'),
('Tokyo', 'Japan', 9, 90, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'),
('London', 'United Kingdom', 9, 88, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'),
('Barcelona', 'Spain', 6, 85, 'https://images.unsplash.com/photo-1583422409516-2895a77efded'),
('New York', 'United States', 9, 93, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'),
('Dubai', 'UAE', 8, 87, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'),
('Amsterdam', 'Netherlands', 7, 83, 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017'),
('Bangkok', 'Thailand', 4, 86, 'https://images.unsplash.com/photo-1508009603885-50cf7c579365'),
('Sydney', 'Australia', 8, 84, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9'),
('Singapore', 'Singapore', 8, 82, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd'),
('Istanbul', 'Turkey', 5, 81, 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200'),
('Prague', 'Czech Republic', 5, 79, 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef'),
('Lisbon', 'Portugal', 5, 78, 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a'),
('Vienna', 'Austria', 6, 77, 'https://images.unsplash.com/photo-1516550893923-42d28e5677af'),
('Bali', 'Indonesia', 3, 89, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4'),
('Santorini', 'Greece', 7, 91, 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff'),
('Kyoto', 'Japan', 7, 88, 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'),
('Venice', 'Italy', 8, 87, 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0'),
('Los Angeles', 'United States', 8, 85, 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261');

-- Insert Activities (letting PostgreSQL auto-generate UUIDs)
INSERT INTO activities (name, description, category, cost, duration, image_url) VALUES
('Eiffel Tower Visit', 'Visit the iconic Eiffel Tower', 'sightseeing', 25, 120, 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f'),
('Colosseum Tour', 'Explore ancient Roman amphitheater', 'sightseeing', 30, 150, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5'),
('Louvre Museum', 'World-famous art museum', 'culture', 20, 180, 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a'),
('Statue of Liberty', 'Visit American icon', 'sightseeing', 23, 120, 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74'),
('Big Ben Tour', 'See London''s famous clock tower', 'sightseeing', 18, 60, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'),
('Sagrada Familia', 'Gaudí''s masterpiece basilica', 'culture', 26, 90, 'https://images.unsplash.com/photo-1583422409516-2895a77efded'),
('Tokyo Tower', 'Observation deck with city views', 'sightseeing', 15, 90, 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc'),
('Burj Khalifa', 'World''s tallest building', 'sightseeing', 40, 120, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'),
('French Cooking Class', 'Learn to cook French cuisine', 'food', 85, 180, 'https://images.unsplash.com/photo-1556910096-6f5e72db6803'),
('Italian Wine Tasting', 'Taste local Italian wines', 'food', 50, 120, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3'),
('Sushi Making Workshop', 'Learn to make authentic sushi', 'food', 70, 150, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351'),
('Street Food Tour', 'Sample local street food', 'food', 35, 180, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'),
('Tapas Bar Hopping', 'Visit multiple tapas bars', 'food', 45, 180, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'),
('Hot Air Balloon Ride', 'Scenic balloon flight', 'adventure', 200, 180, 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74'),
('Scuba Diving', 'Underwater exploration', 'adventure', 120, 240, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'),
('Zip Lining', 'Thrilling canopy tour', 'adventure', 75, 120, 'https://images.unsplash.com/photo-1476610182048-b716b8518aae'),
('Hiking Tour', 'Guided mountain hike', 'adventure', 40, 300, 'https://images.unsplash.com/photo-1551632811-561732d1e306'),
('Traditional Tea Ceremony', 'Japanese tea experience', 'culture', 30, 90, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9'),
('Flamenco Show', 'Traditional Spanish dance', 'culture', 55, 120, 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad'),
('Opera Performance', 'Classical opera show', 'culture', 80, 180, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'),
('Museum Pass', 'Access to multiple museums', 'culture', 60, 480, 'https://images.unsplash.com/photo-1554907984-15263bfd63bd'),
('Spa Day', 'Full day spa treatment', 'relaxation', 150, 240, 'https://images.unsplash.com/photo-1540555700478-4be289fbecef'),
('Beach Day', 'Relax at the beach', 'relaxation', 20, 360, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
('Yoga Retreat', 'Peaceful yoga session', 'relaxation', 45, 120, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'),
('Sunset Cruise', 'Romantic evening cruise', 'relaxation', 90, 150, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5');
