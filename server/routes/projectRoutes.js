const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// Routes for /api/projects
router.route('/')
  .get(getProjects)                   // Public: anyone can view
  .post(protect, createProject);       // Protected: Admin only

// Routes for /api/projects/:id
router.route('/:id')
  .get(getProjectById)                // Public: anyone can view
  .put(protect, updateProject)         // Protected: Admin only
  .delete(protect, deleteProject);     // Protected: Admin only

module.exports = router;
