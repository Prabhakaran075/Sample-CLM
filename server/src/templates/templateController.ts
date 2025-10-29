
import express from 'express';
// import Template from './templateModel';

const mockTemplates = [
    { id: 'tpl-001', title: 'Master Service Agreement (MSA)', description: 'A comprehensive agreement for ongoing services.', category: 'Sales', usageCount: 125, author: 'Simple CLM' },
    { id: 'tpl-002', title: 'Non-Disclosure Agreement (NDA)', description: 'A standard mutual non-disclosure agreement.', category: 'Legal', usageCount: 340, author: 'Simple CLM' },
    { id: 'tpl-003', title: 'Employee Offer Letter', description: 'A standard offer letter for new hires.', category: 'HR', usageCount: 88, author: 'Simple CLM' },
];

/**
 * Controller for the Contract Template Marketplace.
 */
class TemplateController {
  
  /**
   * @desc    Get all available templates (public and tenant-specific).
   * @route   GET /api/templates
   * @access  Private
   */
  public static async getTemplates(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      // TODO: Replace with real database query.
      // Fetch all templates where tenantId is null (public) or matches req.tenantId.
      // const templates = await Template.find({
      //   $or: [{ tenantId: null }, { tenantId: req.tenantId }]
      // });
      res.status(200).json(mockTemplates);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Create a new contract template.
   * @route   POST /api/templates
   * @access  Private (Org Admin)
   */
  public static async createTemplate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
      try {
          // const { title, description, category, content } = req.body;
          // const tenantId = req.tenantId;
          // const newTemplate = new Template({ title, description, category, content, tenantId });
          // await newTemplate.save();
          res.status(201).json({ message: 'TODO: Template created successfully', template: req.body });
      } catch (error) {
          next(error);
      }
  }

  /**
   * @desc    Get a single template by ID.
   * @route   GET /api/templates/:id
   * @access  Private
   */
  public static async getTemplateById(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
      try {
          const template = mockTemplates.find(t => t.id === req.params.id);
          if (template) {
              res.status(200).json(template);
          } else {
              res.status(404).json({ message: 'Template not found' });
          }
      } catch (error) {
          next(error);
      }
  }
}

export default TemplateController;
