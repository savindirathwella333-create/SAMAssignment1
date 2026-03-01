require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const authRoutes    = require('./routes/auth');
const apiRoutes     = require('./routes/api');
const projectRoutes = require('./routes/projects');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true
}));
app.use(express.json());

// ── MongoDB Connection (cached for serverless) ────────────
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

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── Local dev server (not used by Vercel) ─────────────────
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ── Export for Vercel ─────────────────────────────────────
module.exports = app;