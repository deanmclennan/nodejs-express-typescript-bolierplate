// Routes for express app

import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// Routes

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🦄🌈✨Hello World From Router! 🌈✨🦄',
  });
});

export default router;
