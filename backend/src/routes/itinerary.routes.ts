import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import itineraryService from '../services/itinerary.service';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// POST /api/itinerary/:tripId/stops - Add city to trip
router.post('/:tripId/stops', [
    body('cityId').notEmpty().withMessage('City ID required'),
    body('startDate').isISO8601().withMessage('Valid start date required'),
    body('endDate').isISO8601().withMessage('Valid end date required'),
], async (req: AuthRequest, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const stop = await itineraryService.addStop(req.params.tripId, req.user!.id, req.body);
        return res.status(201).json(stop);
    } catch (error: any) {
        console.error('Add stop error:', error);
        return res.status(400).json({ error: error.message });
    }
});

// DELETE /api/itinerary/stops/:stopId - Remove city
router.delete('/stops/:stopId', async (req: AuthRequest, res: Response) => {
    try {
        await itineraryService.removeStop(req.params.stopId, req.user!.id);
        return res.status(204).send();
    } catch (error: any) {
        console.error('Remove stop error:', error);
        return res.status(400).json({ error: error.message });
    }
});

// POST /api/itinerary/stops/:stopId/activities - Add activity to stop
router.post('/stops/:stopId/activities', [
    body('activityId').notEmpty().withMessage('Activity ID required'),
    body('date').isISO8601().withMessage('Valid date required'),
], async (req: AuthRequest, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const activity = await itineraryService.addActivity(req.params.stopId, req.user!.id, req.body);
        return res.status(201).json(activity);
    } catch (error: any) {
        console.error('Add activity error:', error);
        return res.status(400).json({ error: error.message });
    }
});

// DELETE /api/itinerary/activities/:activityId - Remove activity
router.delete('/activities/:activityId', async (req: AuthRequest, res: Response) => {
    try {
        await itineraryService.removeActivity(req.params.activityId, req.user!.id);
        return res.status(204).send();
    } catch (error: any) {
        console.error('Remove activity error:', error);
        return res.status(400).json({ error: error.message });
    }
});

// PUT /api/itinerary/:tripId/stops/reorder - Reorder cities
router.put('/:tripId/stops/reorder', [
    body('stopOrders').isArray().withMessage('stopOrders must be an array'),
], async (req: AuthRequest, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await itineraryService.reorderStops(req.params.tripId, req.user!.id, req.body);
        return res.status(200).json({ message: 'Stops reordered successfully' });
    } catch (error: any) {
        console.error('Reorder stops error:', error);
        return res.status(400).json({ error: error.message });
    }
});

// GET /api/itinerary/:tripId - Get full itinerary
router.get('/:tripId', async (req: AuthRequest, res: Response) => {
    try {
        const itinerary = await itineraryService.getItinerary(req.params.tripId);
        return res.json(itinerary);
    } catch (error: any) {
        console.error('Get itinerary error:', error);
        return res.status(404).json({ error: error.message });
    }
});

export default router;
