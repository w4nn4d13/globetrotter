import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import shareService from '../services/share.service';

const router = Router();

// POST /api/share/:tripId - Generate share link (protected)
router.post('/:tripId', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const result = await shareService.generateShareLink(req.params.tripId, req.user!.id);
        return res.json(result);
    } catch (error: any) {
        console.error('Generate share link error:', error);
        return res.status(400).json({ error: error.message });
    }
});

// GET /api/public/trips/:shareToken - Public trip view (no auth)
router.get('/public/trips/:shareToken', async (req: Request, res: Response) => {
    try {
        const result = await shareService.getPublicTrip(req.params.shareToken);
        return res.json(result);
    } catch (error: any) {
        console.error('Get public trip error:', error);
        return res.status(404).json({ error: error.message });
    }
});

// POST /api/trips/copy/:shareToken - Copy shared trip (protected)
router.post('/trips/copy/:shareToken', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const trip = await shareService.copyTrip(req.params.shareToken, req.user!.id);
        return res.status(201).json(trip);
    } catch (error: any) {
        console.error('Copy trip error:', error);
        return res.status(400).json({ error: error.message });
    }
});

export default router;
