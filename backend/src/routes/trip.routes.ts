import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import tripService from '../services/trip.service';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Validation
const createTripValidation = [
    body('name').trim().notEmpty().withMessage('Trip name is required'),
    body('startDate').isISO8601().withMessage('Valid start date required'),
    body('endDate').isISO8601().withMessage('Valid end date required'),
];

// POST /api/trips - Create new trip
router.post('/', createTripValidation, async (req: AuthRequest, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const trip = await tripService.createTrip(req.user!.id, req.body);
        return res.status(201).json(trip);
    } catch (error: any) {
        console.error('Create trip error:', error);
        return res.status(400).json({ error: error.message });
    }
});

// GET /api/trips - Get all user's trips
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const trips = await tripService.getUserTrips(req.user!.id);
        return res.json(trips);
    } catch (error: any) {
        console.error('Get trips error:', error);
        return res.status(500).json({ error: error.message });
    }
});

// GET /api/trips/:id - Get trip details
router.get('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const trip = await tripService.getTripById(req.params.id, req.user!.id);
        return res.json(trip);
    } catch (error: any) {
        console.error('Get trip error:', error);
        return res.status(404).json({ error: error.message });
    }
});

// PUT /api/trips/:id - Update trip
router.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const trip = await tripService.updateTrip(req.params.id, req.user!.id, req.body);
        return res.json(trip);
    } catch (error: any) {
        console.error('Update trip error:', error);
        return res.status(400).json({ error: error.message });
    }
});

// DELETE /api/trips/:id - Delete trip
router.delete('/:id', async (req: AuthRequest, res: Response) => {
    try {
        await tripService.deleteTrip(req.params.id, req.user!.id);
        return res.status(204).send();
    } catch (error: any) {
        console.error('Delete trip error:', error);
        return res.status(400).json({ error: error.message });
    }
});

export default router;
