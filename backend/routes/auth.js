const express = require('express');
const router = express.Router();
const { signupCandidate, loginCandidate, getCandidateDetails } = require('../controllers/authControllerCandidate');
const{ signupCompanyHR, loginCompanyHR, getCompanyHRDetails } = require('../controllers/authControllerCompanyHR');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// USER LOGIN AND SIGNUP ROUTES
router.post('/signupCandidate', signupCandidate);
router.post('/loginCandidate', loginCandidate);

// COMPANY HR LOGIN AND SIGNUP ROUTES
router.post('/signupCompanyHR', signupCompanyHR);
router.post('/loginCompanyHR', loginCompanyHR);

// GET CANIDATE DETAILS
router.get('/candidateDetails', jwtMiddleware, getCandidateDetails);

// GET COMPANY HR DETAILS
router.get('/companyHRDetails', jwtMiddleware, getCompanyHRDetails);

module.exports = router;
