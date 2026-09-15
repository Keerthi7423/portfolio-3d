const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/600x400',
    },
    techStack: {
      type: [String],
      required: [true, 'Please specify at least one technology used'],
    },
    liveLink: {
      type: String,
      default: '',
    },
    githubLink: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Project', projectSchema);
