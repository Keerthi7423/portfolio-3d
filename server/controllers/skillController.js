const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private/Admin
const createSkill = async (req, res) => {
  try {
    const { name, category, icon, proficiency } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: 'Skill name and category are required' });
    }

    const skill = await Skill.create({
      name,
      category,
      icon,
      proficiency,
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ message: 'Invalid skill data', error: error.message });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private/Admin
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.status(200).json({ message: 'Skill removed successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getSkills,
  createSkill,
  deleteSkill,
};
