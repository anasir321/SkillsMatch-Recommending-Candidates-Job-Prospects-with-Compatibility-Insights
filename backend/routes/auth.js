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
        getResume,
        applyJob,
        getAppliedJobs,
        getJobDetailsUsingCandidateId
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
        getCompanyDetailsUsingId,
        getApplicantsUsingJobId,
        saveCandidate,
        unsaveCandidate
    } = require('../controllers/authControllerCompanyHR');

const {
    submitJob,
    getJobsbyCompanyHR,
    getAllJobs,
    getJobDetailsUsingId,
    editJob,
    deleteJobUsingId
} = require('../controllers/authControllerJobs')

const jwtMiddlewareCandidate = require('../middleware/jwtMiddlewareCandidate');
const jwtMiddlewareCompanyHR = require('../middleware/jwtMiddlewareCompanyHR');
const jwtMiddlewareAllUsers = require('../middleware/jwtMiddlewareAllUsers');

// CANDIDATE CRUD
router.post('/signupCandidate', signupCandidate);
router.post('/loginCandidate', loginCandidate);
router.post('/createCandidateEducationDetails', jwtMiddlewareCandidate, createCandidateEducationDetails);
router.post('/createCandidateWorkExperience', jwtMiddlewareCandidate, createCandidateWorkExperience);
router.get('/candidateDetails', jwtMiddlewareCandidate, getCandidateDetails);
router.put('/updateCandidateDetails', jwtMiddlewareCandidate, updateCandidateDetails);
router.put('/updateCandidateEducationDetails', jwtMiddlewareCandidate, updateCandidateEducationDetails);
router.put('/updateCandidateWorkExperience', jwtMiddlewareCandidate, updateCandidateWorkExperience);
router.post('/uploadProfilePicture', jwtMiddlewareCandidate, uploadProfilePicture);
router.get('/getProfilePicture', jwtMiddlewareCandidate, getProfilePicture);
router.get('/getAllCandidates', jwtMiddlewareCandidate, getAllCandidates);
router.get('/getProfilePictureUsingId/:id', getProfilePictureUsingId);
router.get('/getCandidateDetailsUsingId/:id', getCandidateDetailsUsingId);
router.get('/getInstituteDetails', jwtMiddlewareCandidate, getInstituteDetails);
router.get('/getWorkExperienceDetails', jwtMiddlewareCandidate, getWorkExperienceDetails);
router.get('/getCandidateDetailsUsingEmail/:email',getCandidateDetailsUsingEmail);
router.post('/uploadResume', jwtMiddlewareCandidate, uploadResume);
router.get('/getResume', jwtMiddlewareCandidate, getResume);
router.get('/getAppliedJobs', jwtMiddlewareCandidate, getAppliedJobs);
router.get('/getJobDetailsUsingCandidateId/:candidate_id', jwtMiddlewareCandidate, getJobDetailsUsingCandidateId);


// COMPANY HR LOGIN AND SIGNUP ROUTES
router.post('/signupCompanyHR', signupCompanyHR);
router.post('/loginCompanyHR', loginCompanyHR);
router.get('/companyHRDetails', jwtMiddlewareCompanyHR, getCompanyHRDetails);

//COMPANY
router.get('/companyDetails', jwtMiddlewareCompanyHR, getCompanyDetails);
router.put('/saveCompanyDetails', jwtMiddlewareCompanyHR, saveCompanyDetails);
router.post('/uploadCompanyProfilePicture', jwtMiddlewareCompanyHR, uploadCompanyProfilePicture);
router.get('/getCompanyProfilePicture', jwtMiddlewareCompanyHR, getCompanyProfilePicture);
// router.get('/getAllCompanies', jwtMiddlewareCompanyHR, getAllCompanies);
router.get('/getAllCompanies', jwtMiddlewareAllUsers, getAllCompanies);
router.get('/getCompanyProfilePictureUsingId/:id', getCompanyProfilePictureUsingId);
router.get('/getCompanyDetailsUsingId/:id', getCompanyDetailsUsingId);
router.get('/getApplicantsUsingJobId/:job_id', jwtMiddlewareCompanyHR, getApplicantsUsingJobId);
router.post('/saveCandidate', jwtMiddlewareCompanyHR, saveCandidate);
router.delete('/unsaveCandidate', jwtMiddlewareCompanyHR, unsaveCandidate);


//JOBS
router.put('/submitJob', jwtMiddlewareCompanyHR, submitJob);
router.get('/getJobsbyCompanyHR', jwtMiddlewareCompanyHR, getJobsbyCompanyHR);
router.get('/getAllJobs', jwtMiddlewareAllUsers, getAllJobs);
// router.get('/getJobDetailsUsingId/:job_id', jwtMiddlewareCompanyHR, getJobDetailsUsingId);
router.get('/getJobDetailsUsingId/:job_id', jwtMiddlewareAllUsers, getJobDetailsUsingId);
router.put('/editJob/:job_id', jwtMiddlewareCompanyHR, editJob);
router.delete('/deleteJobUsingId/:job_id', jwtMiddlewareCompanyHR, deleteJobUsingId);
router.post('/applyJob', jwtMiddlewareCandidate, applyJob);

module.exports = router;
