import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Generation types
export interface Generation {
  id: string;
  userId: string;
  imagePath: string;
  prompt: string;
  resultPath: string | null;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

// Auth API
export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Generation API
export const generationApi = {
  createGeneration: async (image: File, prompt: string) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('prompt', prompt);

    const response = await api.post('/generations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getGeneration: async (id: string) => {
    const response = await api.get(`/generations/${id}`);
    return response.data;
  },

  getRecentGenerations: async () => {
    const response = await api.get('/generations');
    return response.data;
  },
};

export default api;