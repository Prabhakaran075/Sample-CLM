
// FIX: Import specific types from Express for proper type checking.
import { Request, Response, NextFunction } from 'express';
import Template from './templateModel';

/**
 * Controller for the Contract Template Marketplace.
 */
class TemplateController {
  
  /**
   * @desc    Get all available templates (public and tenant-specific).
   * @route   GET /api/templates
   * @access  Private
   */
  public static async getTemplates(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // In a real multi-tenant app, you would filter by req.tenantId:
      // const templates = await Template.find({ $or: [{ tenantId: null }, { tenantId: req.tenantId }] }).sort({ createdAt: -1 });
      const templates = await Template.find().sort({ createdAt: -1 });
      res.status(200).json(templates);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Create a new contract template.
   * @route   POST /api/templates
   * @access  Private (Org Admin)
   */
  public static async createTemplate(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
          const { title, description, category, content, author } = req.body;
          // In a multi-tenant app, you would associate this with the tenant:
          // const tenantId = req.tenantId;
          const newTemplate = new Template({ title, description, category, content, author });
          const savedTemplate = await newTemplate.save();
          res.status(201).json(savedTemplate);
      } catch (error: any) {
          if (error.name === 'ValidationError') {
              res.status(400).json({ message: error.message });
          } else {
              next(error);
          }
      }
  }

  /**
   * @desc    Get a single template by ID.
   * @route   GET /api/templates/:id
   * @access  Private
   */
  public static async getTemplateById(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
          const template = await Template.findById(req.params.id);
          if (!template) {
              res.status(404).json({ message: 'Template not found' });
              return;
          }
          res.status(200).json(template);
      } catch (error) {
          next(error);
      }
  }

  /**
   * @desc    Use a template, incrementing its usage count.
   * @route   POST /api/templates/:id
   * @access  Private
   */
  public static async useTemplate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const template = await Template.findById(req.params.id);
        if (!template) {
            res.status(404).json({ message: "Template not found" });
            return;
        }

        template.usageCount += 1;
        await template.save();

        // The frontend can now use this template's content to start a new contract.
        // The backend's job here is to track usage and confirm success.
        res.status(200).json({ message: "Template usage tracked successfully", template });
    } catch (error) {
        next(error);
    }
  }

  /**
   * @desc    Delete a template by ID.
   * @route   DELETE /api/templates/:id
   * @access  Private (Org Admin)
   */
  public static async deleteTemplate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const template = await Template.findByIdAndDelete(req.params.id);
        if (!template) {
            res.status(404).json({ message: "Template not found" });
            return;
        }
        res.status(200).json({ message: "Template deleted successfully" });
    } catch (error) {
        next(error);
    }
  }
}

export default TemplateController;