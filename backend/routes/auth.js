const express = require('express');
const router = express.Router();
const { signupCandidate, loginCandidate} = require('../controllers/authControllerCandidate');
const{ signupCompanyHR, loginCompanyHR, getCompanyHRDetails } = require('../controllers/authControllerCompanyHR');
const { getUserDetails } = require('../controllers/userController');

// USER LOGIN AND SIGNUP ROUTES
router.post('/signupCandidate', signupCandidate);
router.post('/loginCandidate', loginCandidate);

// COMPANY HR LOGIN AND SIGNUP ROUTES
router.post('/signupCompanyHR', signupCompanyHR);
router.post('/loginCompanyHR', loginCompanyHR);

// GET CANIDATE DETAILS
router.get('/me', getUserDetails);

// GET COMPANY HR DETAILS
router.get('/companyHRDetails', getCompanyHRDetails);

module.exports = router;
