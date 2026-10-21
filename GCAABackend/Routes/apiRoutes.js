import express from 'express';
import adminAuthRoutes from './adminAuthRoutes.js';
import registeredMemberRoutes from './registeredMemberRoutes.js';
import batchAlumniRoutes from './batchAlumniRoutes.js';
import electionNominationRoutes from './electionNominationRoutes.js';
import blogRoutes from './blogRoutes.js';

const apiRoutes = express.Router();

// Mount all modular API sub-routes
apiRoutes.use('/admin/auth', adminAuthRoutes);
apiRoutes.use('/registered-members', registeredMemberRoutes);
apiRoutes.use('/batch-alumni', batchAlumniRoutes);
apiRoutes.use('/election-nominations', electionNominationRoutes);
apiRoutes.use('/blogs', blogRoutes);

// Health check endpoint under /api/health
apiRoutes.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'Healthy',
    uptime: `${Math.floor(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
  });
});

export { apiRoutes };
export default apiRoutes;
