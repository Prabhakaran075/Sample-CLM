import express from 'express';
// import { protect } from '../middlewares/authMiddleware';
import FederationController from '../federation/federationController';

const router = express.Router();

// This endpoint might use a different authentication method (e.g., shared secret)
// as it's a service-to-service call, not a user-facing one.
// router.use(protectService); 

// @route   POST /api/ai/federation/sync
// @desc    Sync anonymized model updates from a tenant
// @access  Private (Service-to-Service)
router.post('/sync', FederationController.syncModelUpdates);

export default router;