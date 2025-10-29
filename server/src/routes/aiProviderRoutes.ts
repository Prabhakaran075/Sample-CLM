
import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../roles/roleMiddleware';
import AIProviderController from '../ai-providers/providerController';

const router = express.Router();

// All AI provider routes require org admin privileges
router.use(protect);
router.use(authorize('providers:manage'));

// @route   GET /api/ai/providers
// @desc    Get all AI provider configurations for the tenant
// @access  Private (Org Admin)
router.get('/', AIProviderController.getProviders);

// @route   POST /api/ai/providers
// @desc    Add a new AI provider configuration
// @access  Private (Org Admin)
router.post('/', AIProviderController.addProvider);

// TODO: Add routes for updating and deleting providers
// router.put('/:providerId', AIProviderController.updateProvider);
// router.delete('/:providerId', AIProviderController.deleteProvider);

export default router;
