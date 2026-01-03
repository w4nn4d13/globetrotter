export interface CitySearchResponse {
    id: string;
    name: string;
    country: string;
    costIndex: number;
    popularity: number;
    imageUrl?: string;
}

export interface ActivitySearchResponse {
    id: string;
    name: string;
    description?: string;
    category: string;
    cost: number;
    duration?: number;
    imageUrl?: string;
}

export interface SearchFilters {
    query?: string;
    country?: string;
    category?: string;
    minCost?: number;
    maxCost?: number;
    minDuration?: number;
    maxDuration?: number;
}
