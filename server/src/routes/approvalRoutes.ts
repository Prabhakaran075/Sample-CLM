import express from 'express';
import ApprovalController from '../controllers/approvalController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../roles/roleMiddleware';

const router = express.Router();

// In a real app, auth middleware would be enabled like this:
router.use(protect);

// @route   GET /api/approvals
// @desc    Get all contracts pending approval
// @access  Private (e.g., requires 'workflows:approve' permission)
router.get('/', authorize('workflows:approve'), ApprovalController.getPendingApprovals);

// @route   POST /api/approvals/:id/:action
// @desc    Approve or reject a contract
// @access  Private (e.g., requires 'workflows:approve' permission)
router.post('/:id/:action', authorize('workflows:approve'), ApprovalController.updateApprovalStatus);

export default router;