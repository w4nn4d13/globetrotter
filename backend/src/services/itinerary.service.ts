import prisma from '../config/prisma';
import { AddStopRequest, AddActivityRequest, ItineraryResponse, ReorderStopsRequest } from '../types/itinerary.types';

export class ItineraryService {
    async addStop(tripId: string, userId: string, data: AddStopRequest) {
        // Verify trip ownership
        const trip = await prisma.trip.findFirst({
            where: { id: tripId, userId },
        });

        if (!trip) {
            throw new Error('Trip not found or unauthorized');
        }

        // Get current max order
        const maxOrder = await prisma.tripStop.findFirst({
            where: { tripId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const stop = await prisma.tripStop.create({
            data: {
                tripId,
                cityId: data.cityId,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                notes: data.notes,
                order: (maxOrder?.order || 0) + 1,
            },
            include: {
                city: true,
            },
        });

        return stop;
    }

    async removeStop(stopId: string, userId: string) {
        const stop = await prisma.tripStop.findUnique({
            where: { id: stopId },
            include: { trip: true },
        });

        if (!stop || stop.trip.userId !== userId) {
            throw new Error('Stop not found or unauthorized');
        }

        await prisma.tripStop.delete({
            where: { id: stopId },
        });
    }

    async addActivity(stopId: string, userId: string, data: AddActivityRequest) {
        const stop = await prisma.tripStop.findUnique({
            where: { id: stopId },
            include: { trip: true },
        });

        if (!stop || stop.trip.userId !== userId) {
            throw new Error('Stop not found or unauthorized');
        }

        // Get current max order for this date
        const maxOrder = await prisma.tripActivity.findFirst({
            where: { stopId, date: new Date(data.date) },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const activity = await prisma.tripActivity.create({
            data: {
                stopId,
                activityId: data.activityId,
                date: new Date(data.date),
                time: data.time,
                notes: data.notes,
                order: (maxOrder?.order || 0) + 1,
            },
            include: {
                activity: true,
            },
        });

        return activity;
    }

    async removeActivity(activityId: string, userId: string) {
        const activity = await prisma.tripActivity.findUnique({
            where: { id: activityId },
            include: { stop: { include: { trip: true } } },
        });

        if (!activity || activity.stop.trip.userId !== userId) {
            throw new Error('Activity not found or unauthorized');
        }

        await prisma.tripActivity.delete({
            where: { id: activityId },
        });
    }

    async reorderStops(tripId: string, userId: string, data: ReorderStopsRequest) {
        const trip = await prisma.trip.findFirst({
            where: { id: tripId, userId },
        });

        if (!trip) {
            throw new Error('Trip not found or unauthorized');
        }

        // Update each stop's order
        await Promise.all(
            data.stopOrders.map(({ id, order }) =>
                prisma.tripStop.update({
                    where: { id },
                    data: { order },
                })
            )
        );
    }

    async getItinerary(tripId: string): Promise<ItineraryResponse> {
        const trip = await prisma.trip.findUnique({
            where: { id: tripId },
            include: {
                stops: {
                    include: {
                        city: true,
                        activities: {
                            include: {
                                activity: true,
                            },
                            orderBy: [{ date: 'asc' }, { order: 'asc' }],
                        },
                    },
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!trip) {
            throw new Error('Trip not found');
        }

        const stops = trip.stops.map(stop => ({
            id: stop.id,
            city: {
                id: stop.city.id,
                name: stop.city.name,
                country: stop.city.country,
                imageUrl: stop.city.imageUrl || undefined,
            },
            startDate: stop.startDate.toISOString(),
            endDate: stop.endDate.toISOString(),
            order: stop.order,
            notes: stop.notes || undefined,
            activities: stop.activities.map(act => ({
                id: act.id,
                activity: {
                    id: act.activity.id,
                    name: act.activity.name,
                    description: act.activity.description || undefined,
                    category: act.activity.category,
                    cost: act.activity.cost,
                    duration: act.activity.duration || undefined,
                    imageUrl: act.activity.imageUrl || undefined,
                },
                date: act.date.toISOString(),
                time: act.time || undefined,
                order: act.order,
                notes: act.notes || undefined,
            })),
        }));

        const totalCost = stops.reduce(
            (sum, stop) => sum + stop.activities.reduce((s, a) => s + a.activity.cost, 0),
            0
        );

        const totalDays = Math.ceil(
            (trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
            tripId: trip.id,
            tripName: trip.name,
            startDate: trip.startDate.toISOString(),
            endDate: trip.endDate.toISOString(),
            stops,
            totalCost,
            totalDays,
        };
    }
}

export default new ItineraryService();
