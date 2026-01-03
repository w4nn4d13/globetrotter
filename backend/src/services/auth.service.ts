import prisma from '../config/prisma';
import { LoginRequest, SignupRequest, AuthResponse } from '../types/auth.types';
import { generateToken, hashPassword, comparePassword } from '../utils/auth.utils';

export class AuthService {
    async signup(data: SignupRequest): Promise<AuthResponse> {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await hashPassword(data.password);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: 'user',
            },
        });

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    }

    async login(data: LoginRequest): Promise<AuthResponse> {
        // Find user
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check password
        const isPasswordValid = await comparePassword(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token,
        };
    }
}

export default new AuthService();
