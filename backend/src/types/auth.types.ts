export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    token: string;
    refreshToken?: string;
}

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
}
