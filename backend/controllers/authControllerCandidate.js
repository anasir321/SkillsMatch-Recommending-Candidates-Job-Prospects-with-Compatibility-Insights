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
    
        const token = jwt.sign({ id:candidate.id, email: candidate.email, firstname: candidate.firstname, lastname: candidate.lastname }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(token);
        res.status(200).json({ message: 'candidate logged in successfully', token, id: candidate.id ,firstname: candidate.firstname, lastname: candidate.lastname });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Incorrect email or password!' });
    }
};

module.exports = { signupCandidate, loginCandidate }

