import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Seed Cities
    const cities = [
        { name: 'Paris', country: 'France', costIndex: 8, popularity: 95, imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34' },
        { name: 'Rome', country: 'Italy', costIndex: 7, popularity: 92, imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5' },
        { name: 'Tokyo', country: 'Japan', costIndex: 9, popularity: 90, imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf' },
        { name: 'London', country: 'United Kingdom', costIndex: 9, popularity: 88, imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad' },
        { name: 'Barcelona', country: 'Spain', costIndex: 6, popularity: 85, imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded' },
        { name: 'New York', country: 'United States', costIndex: 9, popularity: 93, imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9' },
        { name: 'Dubai', country: 'UAE', costIndex: 8, popularity: 87, imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c' },
        { name: 'Amsterdam', country: 'Netherlands', costIndex: 7, popularity: 83, imageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017' },
        { name: 'Bangkok', country: 'Thailand', costIndex: 4, popularity: 86, imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365' },
        { name: 'Sydney', country: 'Australia', costIndex: 8, popularity: 84, imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9' },
        { name: 'Singapore', country: 'Singapore', costIndex: 8, popularity: 82, imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd' },
        { name: 'Istanbul', country: 'Turkey', costIndex: 5, popularity: 81, imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200' },
        { name: 'Prague', country: 'Czech Republic', costIndex: 5, popularity: 79, imageUrl: 'https://images.unsplash.com/photo-1592906209472-a36b1f3782ef' },
        { name: 'Lisbon', country: 'Portugal', costIndex: 5, popularity: 78, imageUrl: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a' },
        { name: 'Vienna', country: 'Austria', costIndex: 6, popularity: 77, imageUrl: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af' },
        { name: 'Bali', country: 'Indonesia', costIndex: 3, popularity: 89, imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
        { name: 'Santorini', country: 'Greece', costIndex: 7, popularity: 91, imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff' },
        { name: 'Kyoto', country: 'Japan', costIndex: 7, popularity: 88, imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e' },
        { name: 'Venice', country: 'Italy', costIndex: 8, popularity: 87, imageUrl: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0' },
        { name: 'Los Angeles', country: 'United States', costIndex: 8, popularity: 85, imageUrl: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261' },
    ];

    for (const city of cities) {
        await prisma.city.upsert({
            where: { id: city.name.toLowerCase().replace(/\s/g, '-') },
            update: {},
            create: {
                id: city.name.toLowerCase().replace(/\s/g, '-'),
                ...city,
            },
        });
    }

    console.log('✅ Cities seeded');

    // Seed Activities
    const activities = [
        // Sightseeing
        { name: 'Eiffel Tower Visit', description: 'Visit the iconic Eiffel Tower', category: 'sightseeing', cost: 25, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f' },
        { name: 'Colosseum Tour', description: 'Explore ancient Roman amphitheater', category: 'sightseeing', cost: 30, duration: 150, imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5' },
        { name: 'Louvre Museum', description: 'World-famous art museum', category: 'culture', cost: 20, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a' },
        { name: 'Statue of Liberty', description: 'Visit American icon', category: 'sightseeing', cost: 23, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74' },
        { name: 'Big Ben Tour', description: 'See London\'s famous clock tower', category: 'sightseeing', cost: 18, duration: 60, imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad' },
        { name: 'Sagrada Familia', description: 'Gaudí\'s masterpiece basilica', category: 'culture', cost: 26, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded' },
        { name: 'Tokyo Tower', description: 'Observation deck with city views', category: 'sightseeing', cost: 15, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc' },
        { name: 'Burj Khalifa', description: 'World\'s tallest building', category: 'sightseeing', cost: 40, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c' },

        // Food experiences
        { name: 'French Cooking Class', description: 'Learn to cook French cuisine', category: 'food', cost: 85, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803' },
        { name: 'Italian Wine Tasting', description: 'Taste local Italian wines', category: 'food', cost: 50, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3' },
        { name: 'Sushi Making Workshop', description: 'Learn to make authentic sushi', category: 'food', cost: 70, duration: 150, imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351' },
        { name: 'Street Food Tour', description: 'Sample local street food', category: 'food', cost: 35, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1' },
        { name: 'Tapas Bar Hopping', description: 'Visit multiple tapas bars', category: 'food', cost: 45, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1' },

        // Adventure
        { name: 'Hot Air Balloon Ride', description: 'Scenic balloon flight', category: 'adventure', cost: 200, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74' },
        { name: 'Scuba Diving', description: 'Underwater exploration', category: 'adventure', cost: 120, duration: 240, imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5' },
        { name: 'Zip Lining', description: 'Thrilling canopy tour', category: 'adventure', cost: 75, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae' },
        { name: 'Hiking Tour', description: 'Guided mountain hike', category: 'adventure', cost: 40, duration: 300, imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306' },

        // Culture
        { name: 'Traditional Tea Ceremony', description: 'Japanese tea experience', category: 'culture', cost: 30, duration: 90, imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9' },
        { name: 'Flamenco Show', description: 'Traditional Spanish dance', category: 'culture', cost: 55, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad' },
        { name: 'Opera Performance', description: 'Classical opera show', category: 'culture', cost: 80, duration: 180, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
        { name: 'Museum Pass', description: 'Access to multiple museums', category: 'culture', cost: 60, duration: 480, imageUrl: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd' },

        // Relaxation
        { name: 'Spa Day', description: 'Full day spa treatment', category: 'relaxation', cost: 150, duration: 240, imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef' },
        { name: 'Beach Day', description: 'Relax at the beach', category: 'relaxation', cost: 20, duration: 360, imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
        { name: 'Yoga Retreat', description: 'Peaceful yoga session', category: 'relaxation', cost: 45, duration: 120, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b' },
        { name: 'Sunset Cruise', description: 'Romantic evening cruise', category: 'relaxation', cost: 90, duration: 150, imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5' },
    ];

    for (let i = 0; i < activities.length; i++) {
        await prisma.activity.upsert({
            where: { id: `activity-${i + 1}` },
            update: {},
            create: {
                id: `activity-${i + 1}`,
                ...activities[i],
            },
        });
    }

    console.log('✅ Activities seeded');
    console.log('🎉 Seeding complete!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
