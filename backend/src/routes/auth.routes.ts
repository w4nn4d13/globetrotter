import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import authService from '../services/auth.service';

const router = Router();

// Validation middleware
const signupValidation = [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required'),
];

// POST /api/auth/signup
router.post('/signup', signupValidation, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await authService.signup(req.body);
        return res.status(201).json(result);
    } catch (error: any) {
        console.error('Signup error:', error);
        return res.status(400).json({ error: error.message || 'Signup failed' });
    }
});

// POST /api/auth/login
router.post('/login', loginValidation, async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await authService.login(req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        console.error('Login error:', error);
        return res.status(401).json({ error: error.message || 'Login failed' });
    }
});

export default router;
