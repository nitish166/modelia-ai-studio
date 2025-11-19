import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { generationController } from '../controllers/generation.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'upload_' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
    }
  },
});

// All routes require authentication
router.use(authMiddleware);

// POST /api/generations - Create new generation
router.post('/', upload.single('image'), generationController.createGeneration);

// GET /api/generations - Get recent generations
router.get('/', generationController.getRecentGenerations);

// GET /api/generations/:id - Get specific generation
router.get('/:id', generationController.getGeneration);

export default router;
