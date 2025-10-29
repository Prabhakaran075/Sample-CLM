
import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import GraphController from '../knowledge-graph/graphController';

const router = express.Router();

router.use(protect);

// @route   POST /api/ai/graph/query
// @desc    Query the contract knowledge graph with natural language
// @access  Private
router.post('/query', GraphController.queryGraph);

export default router;
