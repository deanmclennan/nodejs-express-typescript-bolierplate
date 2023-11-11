import fs from 'fs';
import path from 'path';
import express from 'express';
import { Request, Response } from 'express';
// Middleware for express app
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { notFound, errorHandler } from '../src/middleware/index.ts';
import router from './routes/index.ts';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Create a write stream for logging purposes
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// Use Helmet, CORS, and Morgan
app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));

// Parse JSON from the request body
app.use(express.json());

// Routes
app.use('/', router);

// Catch 404 and forward to error handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Export express instance

app.listen(3000, () => {
  console.log('Server is running');
});
