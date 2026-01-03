export interface BudgetBreakdownResponse {
    tripId: string;
    totalCost: number;
    categories: CostCategoryDTO[];
    dailyCosts: DailyCostDTO[];
    averageCostPerDay: number;
    expensiveDays: string[];
}

export interface CostCategoryDTO {
    category: string;
    amount: number;
    percentage: number;
}

export interface DailyCostDTO {
    date: string;
    activities: {
        name: string;
        cost: number;
        category: string;
    }[];
    totalCost: number;
    isExpensive: boolean;
}

export interface CreateBudgetRequest {
    category: string;
    amount: number;
    description?: string;
}
