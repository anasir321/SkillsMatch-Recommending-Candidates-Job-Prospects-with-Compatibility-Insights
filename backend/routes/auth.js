const express = require('express');
const router = express.Router();
const { signup, login} = require('../controllers/authController');
const { getUser } = require('../controllers/userController');
// Define routes
router.post('/signup', signup);
router.post('/login', login);

router.get('/:id', getUser);

module.exports = router;
