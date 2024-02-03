const express = require('express');
const router = express.Router();
const { signupCandidate, loginCandidate} = require('../controllers/authControllerCandidate');
const { getUserDetails } = require('../controllers/userController');

// USER LOGIN AND SIGNUP ROUTES
router.post('/signupCandidate', signupCandidate);
router.post('/loginCandidate', loginCandidate);

router.get('/me', getUserDetails);

module.exports = router;
