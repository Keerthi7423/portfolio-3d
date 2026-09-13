const express = require('express');
const router = express.Router();
const {
  getSkills,
  createSkill,
  deleteSkill,
} = require('../controllers/skillController');

// Routes for /api/skills
router.route('/')
  .get(getSkills)
  .post(createSkill);

// Routes for /api/skills/:id
router.route('/:id')
  .delete(deleteSkill);

module.exports = router;
