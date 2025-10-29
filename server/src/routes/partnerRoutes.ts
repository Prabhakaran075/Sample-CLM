
import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import PartnerController from '../integrations/partners/partnerController';
import { authorize } from '../roles/roleMiddleware';

const router = express.Router();

router.use(protect);

// @route   GET /api/integrations/partners
// @desc    Get all available partner integrations and their status
// @access  Private
router.get('/', PartnerController.getPartnerIntegrations);

// @route   POST /api/integrations/partners/:partnerId/connect
// @desc    Connect a partner integration
// @access  Private (Org Admin)
router.post('/:partnerId/connect', authorize('integrations:manage'), PartnerController.connectPartner);

// TODO: Add routes for disconnecting and configuring partner integrations

export default router;
