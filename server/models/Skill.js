const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required (e.g., Frontend, Backend, 3D, Tools)'],
      trim: true,
    },
    icon: {
      type: String,
      default: '',
    },
    proficiency: {
      type: Number, // Percentage: 0 to 100
      min: 0,
      max: 100,
      default: 80,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
