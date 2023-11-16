const express = require('express');
const router = express.Router();
const { createCandidate } = require('../controllers/candidateController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Candidate routes
router.use(jwtMiddleware);
router.post('/createCandidateProfile', createCandidate);

module.exports = router;