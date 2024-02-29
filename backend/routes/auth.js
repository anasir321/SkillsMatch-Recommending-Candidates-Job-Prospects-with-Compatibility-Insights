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
        getWorkExperienceDetails,
        getCandidateDetailsUsingEmail,
        uploadResume,
        getResume
    } = require('../controllers/authControllerCandidate');

const{  signupCompanyHR, 
        loginCompanyHR, 
        getCompanyHRDetails, 
        getCompanyDetails, 
        saveCompanyDetails,
        uploadCompanyProfilePicture,
        getCompanyProfilePicture,
        getAllCompanies,
        getCompanyProfilePictureUsingId,
        getCompanyDetailsUsingId
    } = require('../controllers/authControllerCompanyHR');

const {
    submitJob,
    getJobsbyCompanyHR,
    getAllJobs,
    getJobDetailsUsingId
} = require('../controllers/authControllerJobs')

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
router.get('/getCandidateDetailsUsingEmail/:email',getCandidateDetailsUsingEmail);
router.post('/uploadResume', jwtMiddleware, uploadResume);
router.get('/getResume', jwtMiddleware, getResume);


// COMPANY HR LOGIN AND SIGNUP ROUTES
router.post('/signupCompanyHR', signupCompanyHR);
router.post('/loginCompanyHR', loginCompanyHR);
router.get('/companyHRDetails', jwtMiddleware, getCompanyHRDetails);

//COMPANY
router.get('/companyDetails', jwtMiddleware, getCompanyDetails);
router.put('/saveCompanyDetails', jwtMiddleware, saveCompanyDetails);
router.post('/uploadCompanyProfilePicture', jwtMiddleware, uploadCompanyProfilePicture);
router.get('/getCompanyProfilePicture', jwtMiddleware, getCompanyProfilePicture);
router.get('/getAllCompanies', jwtMiddleware, getAllCompanies);
router.get('/getCompanyProfilePictureUsingId/:id', getCompanyProfilePictureUsingId);
router.get('/getCompanyDetailsUsingId/:id', getCompanyDetailsUsingId);

//JOBS
router.put('/submitJob', jwtMiddleware, submitJob);
router.get('/getJobsbyCompanyHR', jwtMiddleware, getJobsbyCompanyHR);
router.get('/getAllJobs', jwtMiddleware, getAllJobs);
router.get('/getJobDetailsUsingId/:job_id', jwtMiddleware, getJobDetailsUsingId);

module.exports = router;
