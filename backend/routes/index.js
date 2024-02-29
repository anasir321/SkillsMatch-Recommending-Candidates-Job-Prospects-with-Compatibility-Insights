// routes/index.js
const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./auth');

// Define routes
router.use('/auth', authRoutes);

module.exports = router;