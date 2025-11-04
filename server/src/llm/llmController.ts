
// FIX: Import specific types from Express for proper type checking.
import { Request, Response, NextFunction } from 'express';
import LLMService from './llmService';

/**
 * Controller to handle AI-powered operations on contracts.
 */
class LLMController {

  /**
   * @desc    Generates a summary for the provided contract text.
   * @route   POST /api/ai/summarize
   * @access  Private
   */
  public static async summarizeContract(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { contractText } = req.body;
      // FIX: Get tenantId from authenticated request.
      const tenantId = req.tenantId;

      if (!contractText) {
        res.status(400).json({ message: 'contractText is required' });
        return;
      }
      // FIX: Add check for tenantId.
      if (!tenantId) {
        res.status(401).json({ message: 'Tenant could not be identified.' });
        return;
      }
      
      // FIX: Pass tenantId to the service method.
      const summary = await LLMService.summarize(contractText, tenantId);
      res.status(200).json({ summary });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Extracts key clauses from the provided contract text.
   * @route   POST /api/ai/extract-clauses
   * @access  Private
   */
  public static async extractClauses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { contractText } = req.body;
      const tenantId = req.tenantId;
      if (!contractText) {
        res.status(400).json({ message: 'contractText is required' });
        return;
      }
       if (!tenantId) {
        res.status(401).json({ message: 'Tenant could not be identified.' });
        return;
      }
      // FIX: Pass tenantId to the service method.
      const clauses = await LLMService.extractClauses(contractText, tenantId);
      res.status(200).json({ clauses });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Rewrites a clause in plain English.
   * @route   POST /api/ai/rewrite
   * @access  Private
   */
  public static async rewriteClause(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
      const { clauseText } = req.body;
      const tenantId = req.tenantId;
       if (!clauseText) {
        res.status(400).json({ message: 'clauseText is required' });
        return;
      }
      if (!tenantId) {
        res.status(401).json({ message: 'Tenant could not be identified.' });
        return;
      }
      // FIX: Pass tenantId to the service method.
      const rewrittenClause = await LLMService.rewriteClause(clauseText, tenantId);
      res.status(200).json({ rewrittenClause });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc    Compares two versions of a contract.
   * @route   POST /api/ai/compare
   * @access  Private
   */
  public static async compareVersions(req: Request, res: Response, next: NextFunction): Promise<void> {
     try {
      const { textV1, textV2 } = req.body;
      const tenantId = req.tenantId;
       if (!textV1 || !textV2) {
        res.status(400).json({ message: 'Both textV1 and textV2 are required' });
        return;
      }
      if (!tenantId) {
        res.status(401).json({ message: 'Tenant could not be identified.' });
        return;
      }
      // FIX: Pass tenantId to the service method.
      const differences = await LLMService.compareVersions(textV1, textV2, tenantId);
      res.status(200).json({ differences });
    } catch (error) {
      next(error);
    }
  }
}

export default LLMController;