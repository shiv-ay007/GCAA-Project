/**
 * CORS Configuration Utility for GCAAA Backend
 * Handles origins for both Public Frontend (Vercel / Localhost) and Admin Dashboard
 */

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    // Allow configured origins or vercel preview deployments
    const isAllowed =
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      /\.onrender\.com$/.test(origin) ||
      origin.includes('localhost');

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error(`CORS Error: Origin ${origin} not allowed by GCAAA security policy`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  maxAge: 86400, // 24 hours
};

module.exports = corsOptions;
