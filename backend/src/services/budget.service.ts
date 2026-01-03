import prisma from '../config/prisma';
import { BudgetBreakdownResponse, CostCategoryDTO, DailyCostDTO } from '../types/budget.types';

export class BudgetService {
    async getBudgetBreakdown(tripId: string): Promise<BudgetBreakdownResponse> {
        const trip = await prisma.trip.findUnique({
            where: { id: tripId },
            include: {
                stops: {
                    include: {
                        activities: {
                            include: {
                                activity: true,
                            },
                        },
                    },
                },
            },
        });

        if (!trip) {
            throw new Error('Trip not found');
        }

        // Calculate costs by category
        const categoryTotals: Record<string, number> = {};
        const dailyCosts: Map<string, DailyCostDTO> = new Map();

        trip.stops.forEach(stop => {
            stop.activities.forEach(tripActivity => {
                const activity = tripActivity.activity;
                const category = activity.category;
                const cost = activity.cost;

                // Add to category totals
                categoryTotals[category] = (categoryTotals[category] || 0) + cost;

                // Add to daily costs
                const dateKey = tripActivity.date.toISOString().split('T')[0];
                if (!dailyCosts.has(dateKey)) {
                    dailyCosts.set(dateKey, {
                        date: dateKey,
                        activities: [],
                        totalCost: 0,
                        isExpensive: false,
                    });
                }

                const dailyCost = dailyCosts.get(dateKey)!;
                dailyCost.activities.push({
                    name: activity.name,
                    cost: activity.cost,
                    category: activity.category,
                });
                dailyCost.totalCost += cost;
            });
        });

        // Calculate total cost
        const totalCost = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

        // Format category breakdown with percentages
        const categories: CostCategoryDTO[] = Object.entries(categoryTotals).map(([category, amount]) => ({
            category,
            amount,
            percentage: totalCost > 0 ? (amount / totalCost) * 100 : 0,
        }));

        // Convert daily costs to array and sort by date
        const dailyCostsArray = Array.from(dailyCosts.values()).sort((a, b) =>
            a.date.localeCompare(b.date)
        );

        // Calculate average cost per day
        const totalDays = dailyCostsArray.length || 1;
        const averageCostPerDay = totalCost / totalDays;

        // Mark expensive days (above 1.5x average)
        const expensiveThreshold = averageCostPerDay * 1.5;
        const expensiveDays: string[] = [];

        dailyCostsArray.forEach(day => {
            if (day.totalCost > expensiveThreshold) {
                day.isExpensive = true;
                expensiveDays.push(day.date);
            }
        });

        return {
            tripId,
            totalCost,
            categories,
            dailyCosts: dailyCostsArray,
            averageCostPerDay,
            expensiveDays,
        };
    }

    async getDailyCosts(tripId: string) {
        const breakdown = await this.getBudgetBreakdown(tripId);
        return breakdown.dailyCosts;
    }
}

export default new BudgetService();
