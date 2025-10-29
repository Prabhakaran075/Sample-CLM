import express from 'express';
import LLMController from '../llm/llmController';
import { protect } from '../middlewares/authMiddleware';
import { aiUsageLimiter } from '../middlewares/rateLimiter';

const router = express.Router();

// All AI routes should be protected and rate-limited
router.use(protect);
router.use(aiUsageLimiter); // Apply usage limiter to all AI routes

// @route   POST /api/ai/summarize
// @desc    Generate a summary for a contract
// @access  Private
router.post('/summarize', LLMController.summarizeContract);

// @route   POST /api/ai/extract-clauses
// @desc    Extract key clauses from a contract
// @access  Private
router.post('/extract-clauses', LLMController.extractClauses);

// @route   POST /api/ai/rewrite
// @desc    Rewrite a clause in plain English
// @access  Private
router.post('/rewrite', LLMController.rewriteClause);

// @route   POST /api/ai/compare
// @desc    Compares two versions of a contract
// @access  Private
router.post('/compare', LLMController.compareVersions);


export default router;