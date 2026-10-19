import express from 'express';
import adminAuthRoutes from './adminAuthRoutes.js';
import registeredMemberRoutes from './registeredMemberRoutes.js';
import batchAlumniRoutes from './batchAlumniRoutes.js';
import electionNominationRoutes from './electionNominationRoutes.js';
import blogRoutes from './blogRoutes.js';

const router = express.Router();

// Mount all modular API sub-routes
router.use('/admin/auth', adminAuthRoutes);
router.use('/registered-members', registeredMemberRoutes);
router.use('/batch-alumni', batchAlumniRoutes);
router.use('/election-nominations', electionNominationRoutes);
router.use('/blogs', blogRoutes);

// Health check endpoint under /api/health
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'Healthy',
    uptime: `${Math.floor(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
  });
});

export default router;
