const express = require('express');
const router = express.Router();
const { signupCandidate, loginCandidate, getCandidateDetails, updateCandidateDetails } = require('../controllers/authControllerCandidate');
const{ signupCompanyHR, loginCompanyHR, getCompanyHRDetails } = require('../controllers/authControllerCompanyHR');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// CANDIDATE CRUD
router.post('/signupCandidate', signupCandidate);
router.post('/loginCandidate', loginCandidate);
router.get('/candidateDetails', jwtMiddleware, getCandidateDetails);
router.put('/updateCandidateDetails', jwtMiddleware, updateCandidateDetails);


// COMPANY HR LOGIN AND SIGNUP ROUTES
router.post('/signupCompanyHR', signupCompanyHR);
router.post('/loginCompanyHR', loginCompanyHR);
router.get('/companyHRDetails', jwtMiddleware, getCompanyHRDetails);



module.exports = router;
