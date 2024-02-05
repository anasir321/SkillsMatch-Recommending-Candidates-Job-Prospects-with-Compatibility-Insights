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
    
        const token = jwt.sign({ id:CompanyHR.companyHR_id, email: CompanyHR.email, firstname: CompanyHR.firstname, lastname: CompanyHR.lastname }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(token);
        res.status(200).json({ message: 'Company_HR logged in successfully', token, id: CompanyHR.companyHR_id ,firstname: CompanyHR.firstname, lastname: CompanyHR.lastname });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Incorrect email or password!' });
    }
};

async function getCompanyHRDetails(req, res){
    try{
        console.log("req.user: ",req.user);
        const { id } = req.user; // User ID from JWT payload
        const companyHr = await Company_HR.findOne({ where: { companyHR_id: id } });
        if (!companyHr) {
            return res.status(404).json({
                success: false,
                message: 'Company HR not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Company HR details',
            data: { companyHr }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error! Unable to retrieve companyHR details.',
            error: error.message,
        });
    }

}

module.exports = { signupCompanyHR, loginCompanyHR, getCompanyHRDetails }

