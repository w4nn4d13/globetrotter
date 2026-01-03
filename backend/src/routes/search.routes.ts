import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import searchService from '../services/search.service';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/search/cities - Search cities
router.get('/cities', async (req: Request, res: Response) => {
    try {
        const filters = {
            query: req.query.q as string,
            country: req.query.country as string,
        };

        const cities = await searchService.searchCities(filters);
        return res.json(cities);
    } catch (error: any) {
        console.error('Search cities error:', error);
        return res.status(500).json({ error: error.message });
    }
});

// GET /api/search/activities - Search activities
router.get('/activities', async (req: Request, res: Response) => {
    try {
        const filters = {
            query: req.query.q as string,
            category: req.query.category as string,
            minCost: req.query.minCost ? parseFloat(req.query.minCost as string) : undefined,
            maxCost: req.query.maxCost ? parseFloat(req.query.maxCost as string) : undefined,
            minDuration: req.query.minDuration ? parseInt(req.query.minDuration as string) : undefined,
            maxDuration: req.query.maxDuration ? parseInt(req.query.maxDuration as string) : undefined,
        };

        const activities = await searchService.searchActivities(filters);
        return res.json(activities);
    } catch (error: any) {
        console.error('Search activities error:', error);
        return res.status(500).json({ error: error.message });
    }
});

// GET /api/search/popular-cities - Get popular cities
router.get('/popular-cities', async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        const cities = await searchService.getPopularCities(limit);
        return res.json(cities);
    } catch (error: any) {
        console.error('Get popular cities error:', error);
        return res.status(500).json({ error: error.message });
    }
});

export default router;
