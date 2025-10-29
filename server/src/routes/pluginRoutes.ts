
import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import PluginController from '../plugins/pluginController';

const router = express.Router();

// All plugin routes require authentication
router.use(protect);

// @route   GET /api/plugins
// @desc    Get all published plugins in the marketplace
// @access  Private
router.get('/', PluginController.getPlugins);

// TODO: Add routes for installing, uninstalling, and managing plugins
// router.post('/:pluginId/install', authorize('plugins:manage'), PluginController.installPlugin);
// router.delete('/:pluginId/uninstall', authorize('plugins:manage'), PluginController.uninstallPlugin);

export default router;
