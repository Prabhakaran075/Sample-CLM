
// FIX: Import specific types from Express for proper type checking.
import { Request, Response } from 'express';
import mongoose from 'mongoose';

/**
 * Checks the health of the application, including the database connection.
 * @route GET /api/health
 */
export const checkHealth = (req: Request, res: Response) => {
  const healthStatus = {
    status: 'ok',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    // TODO: Check health of other services (Redis, S3, etc.)
  };

  if (healthStatus.database !== 'connected') {
    return res.status(503).json({ ...healthStatus, status: 'error', message: 'Database connection lost' });
  }

  res.status(200).json(healthStatus);
};