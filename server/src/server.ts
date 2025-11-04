import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db';
import errorHandler from './middlewares/errorHandler';

// Route imports
import authRoutes from './routes/authRoutes';
import contractRoutes from './routes/contractRoutes';
import approvalRoutes from './routes/approvalRoutes';
import aiRoutes from './routes/aiRoutes';
import templateRoutes from './routes/templateRoutes';
import copilotRoutes from './routes/copilotRoutes';
import developerIntegrationRoutes from './routes/integrationRoutes';
import { checkHealth } from './monitoring/healthController';
import pluginRoutes from './routes/pluginRoutes';
import aiProviderRoutes from './routes/aiProviderRoutes';
import knowledgeGraphRoutes from './routes/knowledgeGraphRoutes';
import partnerIntegrationRoutes from './routes/partnerRoutes';
import agentRoutes from './routes/agentRoutes';
import governanceRoutes from './routes/governanceRoutes';
import federationRoutes from './routes/federationRoutes';
import negotiationRoutes from './routes/negotiationRoutes';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // Restrict to frontend URL for security
  credentials: true,
}));
app.use(express.json()); // Body parser for JSON format

// API Routes
app.get('/api/health', checkHealth);

app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/approvals', approvalRoutes);

// Ecosystem & AI Routes (Phase 5, 6, 7)
app.use('/api/ai', aiRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/copilot', copilotRoutes);
app.use('/api/integrations/developer', developerIntegrationRoutes);
app.use('/api/integrations/partners', partnerIntegrationRoutes);
app.use('/api/plugins', pluginRoutes);
app.use('/api/ai/providers', aiProviderRoutes);
app.use('/api/ai/graph', knowledgeGraphRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/governance', governanceRoutes);
app.use('/api/ai/federation', federationRoutes);
app.use('/api/negotiation', negotiationRoutes);


// TODO: Enterprise & Scaling Routes (Phase 4)
// app.use('/api/tenants', tenantRoutes);
// app.use('/api/billing', billingRoutes);
// app.use('/api/admin', adminRoutes);

// Error Handling Middleware (should be the last middleware)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});