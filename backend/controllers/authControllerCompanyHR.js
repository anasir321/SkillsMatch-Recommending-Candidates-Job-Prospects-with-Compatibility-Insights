const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Company_HR } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

async function signupCompanyHR(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;
        const CompanyHR_signup = await Company_HR.create({
            firstname,
            lastname,
            email,
            password: bcrypt.hashSync(password, 8)
        });
        res.status(201).json({ message: 'Company_HR registered successfully', CompanyHR_signup });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error! Unable to register Company_HR.' });
    }
};

async function loginCompanyHR(req, res) {
    try {
        const { email, password } = req.body;
        const CompanyHR = await Company_HR.findOne({ where: { email } });
    
        if(!CompanyHR) {
            return res.status(404).json({ message: 'Company_HR not found' });
        }
    
        const passwordIsValid = bcrypt.compareSync(password, CompanyHR.password);
    
        if(!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ id:CompanyHR.id, email: CompanyHR.email, firstname: CompanyHR.firstname, lastname: CompanyHR.lastname }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(token);
        res.status(200).json({ message: 'Company_HR logged in successfully', token, id: CompanyHR.id ,firstname: CompanyHR.firstname, lastname: CompanyHR.lastname });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Incorrect email or password!' });
    }
};

const getCompanyHRDetails = (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const tokenValue = token.split(' ')[1]; // Extract the token value
    
    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        const { email, firstname, lastname } = decoded;
        res.status(200).json({ email, firstname, lastname });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Token is not valid' });
    }
}

module.exports = { signupCompanyHR, loginCompanyHR, getCompanyHRDetails }

