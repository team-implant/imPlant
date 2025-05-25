import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../config";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthResponse {
  token: string;
  message?: string;
}

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await instance.post<AuthResponse>(
    "/Auth/login",
    credentials
  );
  const { token } = response.data;
  localStorage.setItem("token", token);
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return response.data;
};

const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  const response = await instance.post<AuthResponse>(
    "/Auth/register",
    credentials
  );
  const { token } = response.data;
  localStorage.setItem("token", token);
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return response.data;
};

const getMe = async (): Promise<User> => {
  const response = await instance.get<User>("/Auth/me");
  return response.data;
};

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>(login);
};

export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterCredentials>(register);
};

export const useGetMe = () => {
  return useQuery<User, Error>(["me"], getMe);
};

export const logout = () => {
  localStorage.removeItem("token");
  delete instance.defaults.headers.common["Authorization"];
};

const token = localStorage.getItem("token");
if (token) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
