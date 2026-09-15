const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

// @desc    Upload an image file to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message || 'Error uploading file',
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded. Please attach an image in the form-data with key "image".',
            });
        }

        // req.file contains Cloudinary upload details
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully!',
            imageUrl: req.file.path, // Cloudinary Secure HTTPS URL
            public_id: req.file.filename,
        });
    });
});

module.exports = router;
