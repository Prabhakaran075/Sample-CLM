

import { GoogleGenAI } from "@google/genai";
// import AIProvider from '../models/AIProvider'; // To get tenant-specific providers

/**
 * Service to interact with a Large Language Model (LLM) like Gemini.
 * This has been refactored into a factory to support multiple AI providers (BYOM).
 */
class LLMService {
  private static defaultAI: GoogleGenAI | null = null;

  /**
   * Initializes the default LLM client.
   */
  public static initialize(): void {
    if (!process.env.API_KEY) {
      console.warn('API_KEY is not set for the default Gemini provider. LLMService will be limited.');
      return;
    }
    this.defaultAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    console.log('Default Gemini AI Service Initialized.');
  }
  
  /**
   * Gets the appropriate AI client for a given tenant.
   * If the tenant has a custom provider configured, it initializes a client for it.
   * Otherwise, it returns the default client.
   * @param tenantId The ID of the tenant making the request.
   * @returns An instance of a configured AI client.
   */
  private static async getAIClientForTenant(tenantId: string): Promise<GoogleGenAI> {
    // TODO: Enterprise Enhancement - Implement BYOM (Bring Your Own Model)
    // 1. Look up the AIProvider configuration for the given tenantId in the database.
    //    const providerConfig = await AIProvider.findOne({ tenantId });
    // 2. If a custom provider is found and enabled:
    //    - Decrypt the API key.
    //    - Initialize and return a new client for that provider (e.g., new OpenAI({ apiKey })).
    //    console.log(`Using custom AI provider for tenant ${tenantId}`);
    //    return new GoogleGenAI({ apiKey: providerConfig.decryptedApiKey }); // Example
    
    if (this.defaultAI) {
        return this.defaultAI;
    }
    throw new Error('AI Service is not configured.');
  }

  private static async generateContentWithClient(tenantId: string, prompt: string): Promise<string> {
    const aiClient = await this.getAIClientForTenant(tenantId);
    
    // TODO: Implement caching layer (e.g., Redis)
    
    try {
      const response = await aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });
      // TODO: Log token usage for tenant billing.
      return response.text;
    } catch (error) {
      console.error('Error calling AI API:', error);
      throw new Error('Failed to generate content from AI service.');
    }
  }

  // FIX: Added a generic query method for the AI assistant.
  public static async query(prompt: string, tenantId: string): Promise<string> {
    return this.generateContentWithClient(tenantId, prompt);
  }

  public static async summarize(text: string, tenantId: string): Promise<string> {
    const prompt = `Summarize the key points of the following contract in 3-4 concise bullet points:\n\n---\n\n${text}`;
    return this.generateContentWithClient(tenantId, prompt);
  }

  public static async extractClauses(text: string, tenantId: string): Promise<string> {
    const prompt = `From the following contract, extract the key clauses such as "Term and Termination", "Payment Terms", "Confidentiality", and "Liability". Format the output as a list:\n\n---\n\n${text}`;
    return this.generateContentWithClient(tenantId, prompt);
  }

  public static async rewriteClause(text: string, tenantId: string): Promise<string> {
    const prompt = `Rewrite the following legal clause in simple, plain English that a non-lawyer can easily understand:\n\n---\n\n"${text}"`;
    return this.generateContentWithClient(tenantId, prompt);
  }

  public static async compareVersions(textV1: string, textV2: string, tenantId: string): Promise<string> {
    const prompt = `
      You are an expert legal assistant. Compare the two versions of the contract below and provide a concise summary of the key differences.
      Focus on material changes to obligations, terms, and liabilities.

      --- VERSION 1 ---
      ${textV1}
      
      --- VERSION 2 ---
      ${textV2}
      
      --- SUMMARY OF DIFFERENCES ---
    `;
    return this.generateContentWithClient(tenantId, prompt);
  }
}

// Initialize the service on module load
LLMService.initialize();

export default LLMService;