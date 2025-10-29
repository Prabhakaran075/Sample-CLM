import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../roles/roleMiddleware';
import WebhooksController from '../integrations/webhooksController';
import ApiKeyService from '../integrations/apiKeyService';

const router = express.Router();

// All routes in this file are for tenant admins
router.use(protect);
router.use(authorize('integrations:manage')); // A new permission for this

// === API Keys ===

// @route   POST /api/integrations/apikeys
// @desc    Generate a new API key for the tenant
// @access  Private (Org Admin)
router.post('/apikeys', (req, res) => {
    const apiKey = ApiKeyService.generateApiKey(req.tenantId!);
    res.status(201).json({ message: 'API Key generated successfully. Store it securely, it will not be shown again.', apiKey });
});

// TODO: Add routes to list and revoke API keys

// === Webhooks ===

// @route   POST /api/integrations/webhooks
// @desc    Subscribe to a new webhook event
// @access  Private (Org Admin)
router.post('/webhooks', WebhooksController.createSubscription);

// @route   GET /api/integrations/webhooks
// @desc    List all active webhook subscriptions
// @access  Private (Org Admin)
router.get('/webhooks', WebhooksController.listSubscriptions);

// TODO: Add routes to update and delete webhook subscriptions

export default router;