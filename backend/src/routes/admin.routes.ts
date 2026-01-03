import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';
import adminService from '../services/admin.service';

const router = Router();

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/stats - Platform statistics
router.get('/stats', async (req: AuthRequest, res: Response) => {
    try {
        const stats = await adminService.getPlatformStats();
        return res.json(stats);
    } catch (error: any) {
        console.error('Get stats error:', error);
        return res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/users - User list
router.get('/users', async (req: AuthRequest, res: Response) => {
    try {
        const users = await adminService.getAllUsers();
        return res.json(users);
    } catch (error: any) {
        console.error('Get users error:', error);
        return res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/analytics - Usage analytics
router.get('/analytics', async (req: AuthRequest, res: Response) => {
    try {
        const analytics = await adminService.getUserAnalytics();
        return res.json(analytics);
    } catch (error: any) {
        console.error('Get analytics error:', error);
        return res.status(500).json({ error: error.message });
    }
});

export default router;
