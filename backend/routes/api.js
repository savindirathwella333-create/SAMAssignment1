const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes below require authentication
router.use(protect);

// ── GET /api/dashboard ────────────────────────────────────
router.get('/dashboard', (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}!`,
    data: { userId: req.user._id, role: req.user.role }
  });
});

// ── Admin only route ──────────────────────────────────────
router.get('/admin', restrictTo('admin'), (req, res) => {
  res.json({ message: 'Admin panel data' });
});

module.exports = router;