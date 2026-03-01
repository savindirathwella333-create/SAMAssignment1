const express  = require('express');
const Project  = require('../models/project');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// ── GET /api/projects (public) ────────────────────────────
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── POST /api/projects (admin only) ──────────────────────
router.post('/', protect, restrictTo('admin'), async (req, res) => {
  try {
    const { title, description, image, tags, link, featured } = req.body;
    const project = await Project.create({
      title, description, image,
      tags: tags || [],
      link: link || '#',
      featured: featured || false,
      createdBy: req.user._id
    });
    res.status(201).json({ message: 'Project created', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── PUT /api/projects/:id (admin only) ───────────────────
router.put('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project updated', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── DELETE /api/projects/:id (admin only) ────────────────
router.delete('/:id', protect, restrictTo('admin'), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;