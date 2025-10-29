import express from 'express';
import { getContracts, getContractById } from '../controllers/contractController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../roles/roleMiddleware';


const router = express.Router();

// Apply the 'protect' middleware to all routes in this file
// router.use(protect);

// @route   GET /api/contracts
// @desc    Get all contracts for the user's tenant
// @access  Private (Requires 'contracts:read' permission)
router.get('/', authorize('contracts:read'), getContracts);

// @route   GET /api/contracts/:id
// @desc    Get a single contract by ID
// @access  Private (Requires 'contracts:read' permission)
router.get('/:id', authorize('contracts:read'), getContractById);

// TODO: Add routes for creating, updating, and deleting contracts with RBAC
// router.post('/', authorize('contracts:create'), createContract);
// router.put('/:id', authorize('contracts:update'), updateContract);
// router.delete('/:id', authorize('contracts:delete'), deleteContract);

export default router;
