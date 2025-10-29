import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import NegotiationController from '../negotiation/negotiationController';

const router = express.Router();

router.use(protect);

// @route   POST /api/negotiation/simulate
// @desc    Start a new AI negotiation simulation
// @access  Private
router.post('/simulate', NegotiationController.startSimulation);

// TODO: Add routes for getting simulation status and transcript
// router.get('/:simulationId/status', NegotiationController.getSimulationStatus);

export default router;