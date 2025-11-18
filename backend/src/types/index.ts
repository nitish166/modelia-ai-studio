import { Request } from 'express';

// User types
export interface UserPayload {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

// Auth types
export interface RegisterDto {
  email: string;
  password: string;
  name?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Generation types
export interface CreateGenerationDto {
  prompt: string;
  image: Express.Multer.File;
}

export interface GenerationResponse {
  id: string;
  userId: string;
  imagePath: string;
  prompt: string;
  resultPath: string | null;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}
