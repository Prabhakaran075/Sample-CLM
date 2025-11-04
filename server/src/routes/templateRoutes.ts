
import express from 'express';
import TemplateController from '../templates/templateController';
import { protect } from '../middlewares/authMiddleware';
import { authorize } from '../roles/roleMiddleware';

const router = express.Router();

router.use(protect);

// @route   GET /api/templates
// @desc    Get all available contract templates
// @access  Private
// @route   POST /api/templates
// @desc    Create a new template
// @access  Private (Requires 'templates:create' permission)
router.route('/')
    .get(TemplateController.getTemplates)
    .post(authorize('templates:create'), TemplateController.createTemplate);


// @route   GET /api/templates/:id
// @desc    Get a single template by ID
// @access  Private
// @route   POST /api/templates/:id
// @desc    Use a template (increments usage count)
// @access  Private
// @route   DELETE /api/templates/:id
// @desc    Delete a template
// @access  Private (Requires 'templates:delete' permission)
router.route('/:id')
    .get(TemplateController.getTemplateById)
    .post(TemplateController.useTemplate) 
    .delete(authorize('templates:delete'), TemplateController.deleteTemplate);


export default router;
