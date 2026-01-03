import prisma from '../config/prisma';
import { CreateTripRequest, UpdateTripRequest, TripResponse } from '../types/trip.types';

export class TripService {
    async createTrip(userId: string, data: CreateTripRequest): Promise<TripResponse> {
        const trip = await prisma.trip.create({
            data: {
                userId,
                name: data.name,
                description: data.description,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                coverImage: data.coverImage,
            },
        });

        return this.formatTripResponse(trip);
    }

    async getUserTrips(userId: string) {
        const trips = await prisma.trip.findMany({
            where: { userId },
            include: {
                stops: {
                    include: {
                        city: true,
                        activities: {
                            include: {
                                activity: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return trips.map(trip => ({
            ...this.formatTripResponse(trip),
            stopCount: trip.stops.length,
            cityCount: trip.stops.length,
            estimatedCost: trip.stops.reduce((total, stop) =>
                total + stop.activities.reduce((sum, act) => sum + act.activity.cost, 0), 0
            ),
        }));
    }

    async getTripById(tripId: string, userId: string): Promise<TripResponse> {
        const trip = await prisma.trip.findFirst({
            where: { id: tripId, userId },
            include: {
                stops: {
                    include: {
                        city: true,
                    },
                },
            },
        });

        if (!trip) {
            throw new Error('Trip not found');
        }

        return {
            ...this.formatTripResponse(trip),
            stopCount: trip.stops.length,
            cityCount: trip.stops.length,
        };
    }

    async updateTrip(tripId: string, userId: string, data: UpdateTripRequest): Promise<TripResponse> {
        // Verify ownership
        const existing = await prisma.trip.findFirst({
            where: { id: tripId, userId },
        });

        if (!existing) {
            throw new Error('Trip not found or unauthorized');
        }

        const trip = await prisma.trip.update({
            where: { id: tripId },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.startDate && { startDate: new Date(data.startDate) }),
                ...(data.endDate && { endDate: new Date(data.endDate) }),
                ...(data.coverImage !== undefined && { coverImage: data.coverImage }),
            },
        });

        return this.formatTripResponse(trip);
    }

    async deleteTrip(tripId: string, userId: string): Promise<void> {
        // Verify ownership
        const existing = await prisma.trip.findFirst({
            where: { id: tripId, userId },
        });

        if (!existing) {
            throw new Error('Trip not found or unauthorized');
        }

        await prisma.trip.delete({
            where: { id: tripId },
        });
    }

    private formatTripResponse(trip: any): TripResponse {
        return {
            id: trip.id,
            userId: trip.userId,
            name: trip.name,
            description: trip.description,
            startDate: trip.startDate.toISOString(),
            endDate: trip.endDate.toISOString(),
            coverImage: trip.coverImage,
            createdAt: trip.createdAt.toISOString(),
            updatedAt: trip.updatedAt.toISOString(),
        };
    }
}

export default new TripService();
