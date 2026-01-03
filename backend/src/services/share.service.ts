import prisma from '../config/prisma';
import crypto from 'crypto';

export class ShareService {
    async generateShareLink(tripId: string, userId: string): Promise<{ shareToken: string; shareUrl: string }> {
        // Verify trip ownership
        const trip = await prisma.trip.findFirst({
            where: { id: tripId, userId },
        });

        if (!trip) {
            throw new Error('Trip not found or unauthorized');
        }

        // Check if share already exists
        let share = await prisma.tripShare.findFirst({
            where: { tripId },
        });

        if (!share) {
            // Generate unique share token
            const shareToken = crypto.randomBytes(16).toString('hex');

            share = await prisma.tripShare.create({
                data: {
                    tripId,
                    shareToken,
                    isPublic: true,
                },
            });
        }

        const shareUrl = `${process.env.FRONTEND_URL}/public/trips/${share.shareToken}`;

        return {
            shareToken: share.shareToken,
            shareUrl,
        };
    }

    async getPublicTrip(shareToken: string) {
        const share = await prisma.tripShare.findUnique({
            where: { shareToken },
            include: {
                trip: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            },
                        },
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
                },
            },
        });

        if (!share || !share.isPublic) {
            throw new Error('Trip not found or not public');
        }

        return {
            trip: share.trip,
            author: share.trip.user.name,
        };
    }

    async copyTrip(shareToken: string, userId: string) {
        const share = await prisma.tripShare.findUnique({
            where: { shareToken },
            include: {
                trip: {
                    include: {
                        stops: {
                            include: {
                                activities: true,
                            },
                        },
                    },
                },
            },
        });

        if (!share || !share.isPublic) {
            throw new Error('Trip not found or not public');
        }

        const originalTrip = share.trip;

        // Create a copy of the trip
        const newTrip = await prisma.trip.create({
            data: {
                userId,
                name: `${originalTrip.name} (Copy)`,
                description: originalTrip.description,
                startDate: originalTrip.startDate,
                endDate: originalTrip.endDate,
                coverImage: originalTrip.coverImage,
            },
        });

        // Copy stops and activities
        for (const stop of originalTrip.stops) {
            const newStop = await prisma.tripStop.create({
                data: {
                    tripId: newTrip.id,
                    cityId: stop.cityId,
                    startDate: stop.startDate,
                    endDate: stop.endDate,
                    order: stop.order,
                    notes: stop.notes,
                },
            });

            // Copy activities for this stop
            for (const activity of stop.activities) {
                await prisma.tripActivity.create({
                    data: {
                        stopId: newStop.id,
                        activityId: activity.activityId,
                        date: activity.date,
                        time: activity.time,
                        order: activity.order,
                        notes: activity.notes,
                    },
                });
            }
        }

        return newTrip;
    }
}

export default new ShareService();
