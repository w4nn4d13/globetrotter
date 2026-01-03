import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import prisma from '../config/prisma';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/profile - Get user profile
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user);
    } catch (error: any) {
        console.error('Get profile error:', error);
        return res.status(500).json({ error: error.message });
    }
});

// PUT /api/profile - Update profile
router.put('/', [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
], async (req: AuthRequest, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await prisma.user.update({
            where: { id: req.user!.id },
            data: {
                ...(req.body.name && { name: req.body.name }),
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        return res.json(user);
    } catch (error: any) {
        console.error('Update profile error:', error);
        return res.status(400).json({ error: error.message });
    }
});

export default router;
