import express from 'express';
import { loginUser } from '../controllers/authController';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// TODO: Add routes for registration, logout, and fetching current user profile

export default router;
