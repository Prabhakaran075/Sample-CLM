import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../roles/roleMiddleware';
import GovernanceController from '../governance/governanceController';

const router = express.Router();

router.use(protect);
router.use(authorize('governance:manage'));

// @route   GET /api/governance/stats
// @desc    Get high-level AI governance statistics
// @access  Private (Super Admin)
router.get('/stats', GovernanceController.getStats);

// @route   GET /api/governance/policies
// @desc    Get all AI governance policies
// @access  Private (Super Admin)
router.get('/policies', GovernanceController.getPolicies);

// TODO: Add routes for managing policies
// router.post('/policies', GovernanceController.createPolicy);

export default router;