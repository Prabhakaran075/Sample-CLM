import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../roles/roleMiddleware';
import AgentController from '../agents/agentController';

const router = express.Router();

router.use(protect);
router.use(authorize('agents:manage'));

// @route   GET /api/agents
// @desc    Get all autonomous agents for the tenant
// @access  Private (Org Admin)
router.get('/', AgentController.getAgents);

// @route   POST /api/agents
// @desc    Deploy a new autonomous agent
// @access  Private (Org Admin)
router.post('/', AgentController.createAgent);

// TODO: Add routes for managing a specific agent (e.g., pause, resume, view logs)
// router.get('/:agentId', AgentController.getAgentDetails);
// router.post('/:agentId/pause', AgentController.pauseAgent);

export default router;