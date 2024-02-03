const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Candidate } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

async function signupCandidate(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;
        const candidate_signup = await Candidate.create({
            firstname,
            lastname,
            email,
            password: bcrypt.hashSync(password, 8)
        });
        res.status(201).json({ message: 'Candidate registered successfully', candidate_signup });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error! Unable to register candidate.' });
    }
};

async function loginCandidate(req, res) {
    try {
        const { email, password } = req.body;
        const candidate = await Candidate.findOne({ where: { email } });
    
        if(!candidate) {
            return res.status(404).json({ message: 'candidate not found' });
        }
    
        const passwordIsValid = bcrypt.compareSync(password, candidate.password);
    
        if(!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ id:candidate.candidate_id, email: candidate.email, firstname: candidate.firstname, lastname: candidate.lastname }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(token);
        res.status(200).json({ message: 'candidate logged in successfully', token, id: candidate.candidate_id ,firstname: candidate.firstname, lastname: candidate.lastname });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Incorrect email or password!' });
    }
};

async function getCandidateDetails(req, res){
    try {
        console.log("req.user: ",req.user);
        const { id } = req.user; // User ID from JWT payload
        const candidate = await Candidate.findOne({ where: { candidate_id: id } });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Candidate details retrieved successfully',
            data: { candidate },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error! Unable to retrieve candidate details.',
            error: error.message,
        });
    }
}

module.exports = { signupCandidate, loginCandidate, getCandidateDetails }

