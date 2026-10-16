require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const corsOptions = require('./Utils/corsOptions');
const registeredMemberRoutes = require('./Routes/registeredMemberRoutes');
const batchAlumniRoutes = require('./Routes/batchAlumniRoutes');
const adminAuthRoutes = require('./Routes/adminAuthRoutes');
const { seedDefaultAdmin } = require('./Controllers/adminAuthController');

const app = express();

// Security & Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/registered-members', registeredMemberRoutes);
app.use('/api/batch-alumni', batchAlumniRoutes);

// Health check & Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GCAAA Alumni Association Backend API is running!',
    endpoints: {
      adminAuth: '/api/admin/auth',
      registeredMembers: '/api/registered-members',
      batchAlumni: '/api/batch-alumni',
      stats: '/api/registered-members/stats',
      health: '/api/health',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// MongoDB connection & Server Boot
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Atlas connected successfully!');
    await seedDefaultAdmin();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`GCAAA Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB Atlas connection failed:', error.message);
    process.exit(1);
  });