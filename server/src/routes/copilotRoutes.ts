
import express from 'express';
import CopilotController from '../copilot/copilotController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

// @route   POST /api/copilot/query
// @desc    Send a query to the AI assistant
// @access  Private
router.post('/query', CopilotController.processQuery);

export default router;
