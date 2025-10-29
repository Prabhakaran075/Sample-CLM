import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Mocks - replace with actual database logic
import { UserRole } from '../models/User';

// @desc    Authenticate user & get token (mock implementation)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // TODO: Replace this with a real database lookup and password check (e.g., using bcrypt)
  if (email === 'alex.j@example.com' && password === 'password') {
    
    // Mock user and tenant data
    const mockUser = {
      id: 'user-1',
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      role: UserRole.SUPER_ADMIN,
      activeTenantId: 't-1',
    };

    const token = jwt.sign(
      { id: mockUser.id, tenantId: mockUser.activeTenantId, role: mockUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: mockUser, // In a real app, you might not send the full user object back
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
