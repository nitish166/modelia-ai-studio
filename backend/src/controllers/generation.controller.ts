import { Response } from 'express';
import { generationService } from '../services/generation.service.js';
import { AuthRequest } from '../types/index.js';

export const generationController = {
  // Create new generation
  async createGeneration(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { prompt } = req.body;
      const imageFile = req.file;

      if (!imageFile) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const generation = await generationService.createGeneration({
        userId,
        imagePath: imageFile.path,
        prompt,
      });

      // Simulate async AI processing
      generationService.processGeneration(generation.id).catch(console.error);

      return res.status(201).json({
        message: 'Generation started',
        generation,
      });
    } catch (error) {
      console.error('Create generation error:', error);
      return res.status(500).json({ error: 'Failed to create generation' });
    }
  },

  // Get generation by ID
  async getGeneration(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const generation = await generationService.getGeneration(id, userId);

      if (!generation) {
        return res.status(404).json({ error: 'Generation not found' });
      }

      return res.json({ generation });
    } catch (error) {
      console.error('Get generation error:', error);
      return res.status(500).json({ error: 'Failed to get generation' });
    }
  },

  // Get user's recent generations (up to 5)
  async getRecentGenerations(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const generations = await generationService.getRecentGenerations(userId, 5);

      return res.json({ generations });
    } catch (error) {
      console.error('Get recent generations error:', error);
      return res.status(500).json({ error: 'Failed to get generations' });
    }
  },
};
