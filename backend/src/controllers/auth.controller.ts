import { Request, Response } from 'express';
import authService from '../services/auth.service.js';
import { AuthRequest } from '../types/index.js';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await authService.login(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      const user = await authService.getUserById(req.user!.id);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default new AuthController();
