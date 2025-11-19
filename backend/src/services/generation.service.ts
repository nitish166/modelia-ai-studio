import prisma from '../db.js';
import fs from 'fs/promises';

interface CreateGenerationInput {
  userId: string;
  imagePath: string;
  prompt: string;
}

export const generationService = {
  async createGeneration(input: CreateGenerationInput) {
    const generation = await prisma.generation.create({
      data: {
        userId: input.userId,
        imagePath: input.imagePath,
        prompt: input.prompt,
        status: 'pending',
      },
    });

    return generation;
  },

  async getGeneration(id: string, userId: string) {
    const generation = await prisma.generation.findFirst({
      where: {
        id,
        userId,
      },
    });

    return generation;
  },

  async getRecentGenerations(userId: string, limit: number = 5) {
    const generations = await prisma.generation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return generations;
  },

  async updateGenerationStatus(id: string, status: string, resultPath?: string) {
    const generation = await prisma.generation.update({
      where: { id },
      data: {
        status,
        resultPath,
      },
    });

    return generation;
  },

  // Simulate AI processing with random success/failure
  async processGeneration(id: string) {
    try {
      // Simulate processing delay (2-5 seconds)
      const delay = Math.random() * 3000 + 2000;
      await new Promise(resolve => setTimeout(resolve, delay));

      // Simulate occasional errors (20% chance)
      const shouldFail = Math.random() < 0.2;

      if (shouldFail) {
        throw new Error('Simulated AI processing error');
      }

      const generation = await prisma.generation.findUnique({
        where: { id },
      });

      if (!generation) {
        throw new Error('Generation not found');
      }

      // Copy the uploaded image as the "result" (simulating AI output)
      const resultPath = generation.imagePath.replace('uploads/', 'uploads/result_');
      await fs.copyFile(generation.imagePath, resultPath);

      // Update status to completed
      await this.updateGenerationStatus(id, 'completed', resultPath);

      console.log(`✅ Generation ${id} completed successfully`);
    } catch (error) {
      console.error(`❌ Generation ${id} failed:`, error);
      
      // Update status to failed
      await this.updateGenerationStatus(id, 'failed');
    }
  },
};
