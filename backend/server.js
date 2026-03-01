require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const authRoutes    = require('./routes/auth');
const apiRoutes     = require('./routes/api');
const projectRoutes = require('./routes/projects');

const app = express();

// ── CORS Fix ──────────────────────────────────────────────
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/$/, '');
    const allowed = (process.env.FRONTEND_URL || 'http://localhost:8080').replace(/\/$/, '');
    if (cleanOrigin === allowed) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true
}));

app.use(express.json());

// ── MongoDB Connection (cached for Vercel serverless) ─────
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('✅ MongoDB connected');
}
connectDB().catch(err => console.error('❌ MongoDB error:', err));

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api',          apiRoutes);

// ── Root route (fixes "Cannot GET /" & 404) ───────────────
app.get('/', (req, res) => {
  res.json({ status: 'Backend API is running ✅' });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── Only listen locally, NOT on Vercel ───────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ── MUST export for Vercel ────────────────────────────────
module.exports = app;