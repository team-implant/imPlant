import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const API_URL = 'https://your-api-url.com'; // check with backend guys for actual api endpoint

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        role: string;
    };
}

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<{ token: string }>('/auth/login', credentials);
    const { token } = response.data;
    sessionStorage.setItem('jwt', token);
    
    // Fetch details
    const userResponse = await api.get<{ id: string; username: string; role: string }>('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return { 
        token, 
        user: {
            id: userResponse.data.id,
            email: userResponse.data.username, // The backend returns username, not email to avoid confusion
            role: userResponse.data.role
        }
    };
};

export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginCredentials>(login);
};

export const logout = () => {
    sessionStorage.removeItem('jwt');
};

export default api;