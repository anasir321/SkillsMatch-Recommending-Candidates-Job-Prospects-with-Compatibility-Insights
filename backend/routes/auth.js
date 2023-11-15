const express = require('express');
const router = express.Router();
const { signup, login} = require('../controllers/authController');
const { getUserDetails } = require('../controllers/userController');
// Define routes
router.post('/signup', signup);
router.post('/login', login);

router.get('/me', getUserDetails);

module.exports = router;
