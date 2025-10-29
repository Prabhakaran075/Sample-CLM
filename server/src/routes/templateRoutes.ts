import express from 'express';
import TemplateController from '../templates/templateController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../roles/roleMiddleware';

const router = express.Router();

router.use(protect);

// @route   GET /api/templates
// @desc    Get all available contract templates
// @access  Private
router.get('/', TemplateController.getTemplates);

// @route   POST /api/templates
// @desc    Create a new template
// @access  Private (Requires 'templates:create' permission)
router.post('/', authorize('templates:create'), TemplateController.createTemplate);

// @route   GET /api/templates/:id
// @desc    Get a single template by ID
// @access  Private
router.get('/:id', TemplateController.getTemplateById);

// TODO: Add routes for updating and deleting templates
// router.put('/:id', authorize('templates:update'), TemplateController.updateTemplate);
// router.delete('/:id', authorize('templates:delete'), TemplateController.deleteTemplate);


export default router;