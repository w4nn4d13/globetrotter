export interface CreateTripRequest {
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    coverImage?: string;
}

export interface UpdateTripRequest {
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    coverImage?: string;
}

export interface TripResponse {
    id: string;
    userId: string;
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
    coverImage?: string;
    createdAt: string;
    updatedAt: string;
    stopCount?: number;
    cityCount?: number;
}

export interface TripSummaryDTO {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    coverImage?: string;
    stopCount: number;
    estimatedCost?: number;
}
