import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

const API_URL = 'https://your-api-url.com';

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
    };
}

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', credentials);
    const { token, user } = response.data;
    sessionStorage.setItem('jwt', token);
    return { token, user };
};

export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginCredentials>(login);
};

export const logout = () => {
    sessionStorage.removeItem('jwt');
};

export default api;