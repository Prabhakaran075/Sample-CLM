import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db';
import errorHandler from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import contractRoutes from './routes/contractRoutes';
import { checkHealth } from './monitoring/healthController';

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

// TODO: Enterprise & Scaling Routes (Phase 4)
// app.use('/api/tenants', tenantRoutes);
// app.use('/api/billing', billingRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/ai', aiRoutes);

// Error Handling Middleware (should be the last middleware)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
