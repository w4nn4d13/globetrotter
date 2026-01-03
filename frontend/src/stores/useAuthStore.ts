import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    login: (token, user) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ token, user, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        set({ token: null, user: null, isAuthenticated: false });
    },

    initAuth: () => {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                set({ token, user, isAuthenticated: true });
            } catch {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
            }
        }
    },
}));
