
import express from 'express';
import LLMService from '../llm/llmService';

/**
 * Controller for the AI Contract Copilot assistant.
 */
class CopilotController {

  /**
   * @desc    Processes a query from the AI assistant chat.
   * @route   POST /api/copilot/query
   * @access  Private
   */
  public static async processQuery(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const { query, contractContext } = req.body;
      // FIX: Get tenantId from authenticated request.
      const tenantId = req.tenantId;

      if (!query) {
        res.status(400).json({ message: 'Query is required' });
        return;
      }
      
      // FIX: Add check for tenantId.
      if (!tenantId) {
          res.status(401).json({ message: "Tenant could not be identified." });
          return;
      }

      if (!contractContext) {
          res.status(200).json({ response: "Please select a contract from the list to start asking questions about it." });
          return;
      }
      
      // Construct a detailed, context-aware prompt for the LLM
      const prompt = `
        You are an AI assistant embedded in a Contract Lifecycle Management (CLM) system.
        A user is currently viewing a contract and has asked a question.
        
        USER'S QUESTION:
        "${query}"

        CONTEXT of the contract they are viewing:
        - Title: ${contractContext.title}
        - Parties: ${contractContext.parties.join(', ')}
        - Status: ${contractContext.status}
        - Expiry Date: ${contractContext.expiryDate}
        - AI-Generated Summary: ${contractContext.aiInsights?.summary.join('; ')}
        - AI-Assessed Risk Level: ${contractContext.aiInsights?.riskLevel}

        Based on the user's question and the provided context, generate a helpful and concise response.
        If the question cannot be answered from the context, say so politely.
        Do not mention that you are an AI or that you were given context. Just answer the user's question directly.
      `;

      // FIX: Use the generic 'query' method instead of misusing 'summarize'. Pass tenantId.
      const aiResponse = await LLMService.query(prompt, tenantId);
      
      res.status(200).json({ response: aiResponse });

    } catch (error) {
      next(error);
    }
  }
}

export default CopilotController;
