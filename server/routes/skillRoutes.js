const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  deleteSkill,
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

// Routes for /api/skills
router.route('/')
  .get(getSkills)                // Public
  .post(protect, createSkill);   // Protected: Admin only

// Routes for /api/skills/:id
router.route('/:id')
  .delete(protect, deleteSkill); // Protected: Admin only

module.exports = router;
