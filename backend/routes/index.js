// routes/index.js
const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./auth');
const crudRoutes = require('./crudRoutes');

// Define routes
router.use('/auth', authRoutes);
router.use('/crudAuthenticated', crudRoutes);

module.exports = router;