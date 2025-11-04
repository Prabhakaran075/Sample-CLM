
// FIX: Import specific types from Express for proper type checking.
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Extend the Express Request type to include user and tenantId
declare global {
  namespace Express {
    interface Request {
      user?: any; // In a real app, define a proper user payload type
      tenantId?: string;
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      // TODO: Replace with a real database lookup.
      // Fetch the user from the DB without the password.
      // const user = await User.findById(decoded.id).select('-password');
      // if (!user) {
      //   return res.status(401).json({ message: 'Not authorized, user not found' });
      // }
      
      // For now, attach mock decoded payload to request.
      req.user = { id: decoded.id, role: decoded.role }; 
      req.tenantId = decoded.tenantId;

      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };