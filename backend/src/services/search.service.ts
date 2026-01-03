import prisma from '../config/prisma';
import { CitySearchResponse, ActivitySearchResponse, SearchFilters } from '../types/search.types';

export class SearchService {
    async searchCities(filters: SearchFilters): Promise<CitySearchResponse[]> {
        const { query, country } = filters;

        const cities = await prisma.city.findMany({
            where: {
                ...(query && {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { country: { contains: query, mode: 'insensitive' } },
                    ],
                }),
                ...(country && { country: { contains: country, mode: 'insensitive' } }),
            },
            orderBy: { popularity: 'desc' },
            take: 50,
        });

        return cities.map(city => ({
            id: city.id,
            name: city.name,
            country: city.country,
            costIndex: city.costIndex,
            popularity: city.popularity,
            imageUrl: city.imageUrl || undefined,
        }));
    }

    async searchActivities(filters: SearchFilters): Promise<ActivitySearchResponse[]> {
        const { query, category, minCost, maxCost, minDuration, maxDuration } = filters;

        const activities = await prisma.activity.findMany({
            where: {
                ...(query && {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { description: { contains: query, mode: 'insensitive' } },
                    ],
                }),
                ...(category && { category }),
                ...(minCost !== undefined && { cost: { gte: minCost } }),
                ...(maxCost !== undefined && { cost: { lte: maxCost } }),
                ...(minDuration !== undefined && { duration: { gte: minDuration } }),
                ...(maxDuration !== undefined && { duration: { lte: maxDuration } }),
            },
            orderBy: { cost: 'asc' },
            take: 100,
        });

        return activities.map(activity => ({
            id: activity.id,
            name: activity.name,
            description: activity.description || undefined,
            category: activity.category,
            cost: activity.cost,
            duration: activity.duration || undefined,
            imageUrl: activity.imageUrl || undefined,
        }));
    }

    async getPopularCities(limit: number = 10): Promise<CitySearchResponse[]> {
        const cities = await prisma.city.findMany({
            orderBy: { popularity: 'desc' },
            take: limit,
        });

        return cities.map(city => ({
            id: city.id,
            name: city.name,
            country: city.country,
            costIndex: city.costIndex,
            popularity: city.popularity,
            imageUrl: city.imageUrl || undefined,
        }));
    }
}

export default new SearchService();
