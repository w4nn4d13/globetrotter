export interface AddStopRequest {
    cityId: string;
    startDate: string;
    endDate: string;
    notes?: string;
}

export interface AddActivityRequest {
    activityId: string;
    date: string;
    time?: string;
    notes?: string;
}

export interface StopDTO {
    id: string;
    city: {
        id: string;
        name: string;
        country: string;
        imageUrl?: string;
    };
    startDate: string;
    endDate: string;
    order: number;
    notes?: string;
    activities: ActivityDTO[];
}

export interface ActivityDTO {
    id: string;
    activity: {
        id: string;
        name: string;
        description?: string;
        category: string;
        cost: number;
        duration?: number;
        imageUrl?: string;
    };
    date: string;
    time?: string;
    order: number;
    notes?: string;
}

export interface ItineraryResponse {
    tripId: string;
    tripName: string;
    startDate: string;
    endDate: string;
    stops: StopDTO[];
    totalCost: number;
    totalDays: number;
}

export interface ReorderStopsRequest {
    stopOrders: { id: string; order: number }[];
}
