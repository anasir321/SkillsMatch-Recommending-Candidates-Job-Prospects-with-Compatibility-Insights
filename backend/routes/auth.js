const express = require('express');
const router = express.Router();

const { signupCandidate, 
        loginCandidate,
        createCandidateEducationDetails,
        createCandidateWorkExperience,
        getCandidateDetails, 
        updateCandidateDetails,
        updateCandidateEducationDetails,
        updateCandidateWorkExperience,
        uploadProfilePicture,
        getProfilePicture,
        getAllCandidates,
        getProfilePictureUsingId,
        getCandidateDetailsUsingId,
        getInstituteDetails,
        getWorkExperienceDetails
    } = require('../controllers/authControllerCandidate');

const{ signupCompanyHR, loginCompanyHR, getCompanyHRDetails } = require('../controllers/authControllerCompanyHR');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// CANDIDATE CRUD
router.post('/signupCandidate', signupCandidate);
router.post('/loginCandidate', loginCandidate);
router.post('/createCandidateEducationDetails', jwtMiddleware, createCandidateEducationDetails);
router.post('/createCandidateWorkExperience', jwtMiddleware, createCandidateWorkExperience);
router.get('/candidateDetails', jwtMiddleware, getCandidateDetails);
router.put('/updateCandidateDetails', jwtMiddleware, updateCandidateDetails);
router.put('/updateCandidateEducationDetails', jwtMiddleware, updateCandidateEducationDetails);
router.put('/updateCandidateWorkExperience', jwtMiddleware, updateCandidateWorkExperience);
router.post('/uploadProfilePicture', jwtMiddleware, uploadProfilePicture);
router.get('/getProfilePicture', jwtMiddleware, getProfilePicture);
router.get('/getAllCandidates', jwtMiddleware, getAllCandidates);
router.get('/getProfilePictureUsingId/:id', getProfilePictureUsingId);
router.get('/getCandidateDetailsUsingId/:id', getCandidateDetailsUsingId);
router.get('/getInstituteDetails', jwtMiddleware, getInstituteDetails);
router.get('/getWorkExperienceDetails', jwtMiddleware, getWorkExperienceDetails);

// COMPANY HR LOGIN AND SIGNUP ROUTES
router.post('/signupCompanyHR', signupCompanyHR);
router.post('/loginCompanyHR', loginCompanyHR);
router.get('/companyHRDetails', jwtMiddleware, getCompanyHRDetails);



module.exports = router;
