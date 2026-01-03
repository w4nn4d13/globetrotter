import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import budgetService from '../services/budget.service';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/budget/:tripId - Get budget breakdown
router.get('/:tripId', async (req: AuthRequest, res: Response) => {
    try {
        const breakdown = await budgetService.getBudgetBreakdown(req.params.tripId);
        return res.json(breakdown);
    } catch (error: any) {
        console.error('Get budget error:', error);
        return res.status(404).json({ error: error.message });
    }
});

// GET /api/budget/:tripId/daily - Get daily cost breakdown
router.get('/:tripId/daily', async (req: AuthRequest, res: Response) => {
    try {
        const dailyCosts = await budgetService.getDailyCosts(req.params.tripId);
        return res.json(dailyCosts);
    } catch (error: any) {
        console.error('Get daily costs error:', error);
        return res.status(404).json({ error: error.message });
    }
});

export default router;
