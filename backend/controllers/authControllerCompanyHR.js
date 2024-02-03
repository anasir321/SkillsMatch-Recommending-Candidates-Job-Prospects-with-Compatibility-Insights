const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CompanyHR } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

async function signupCompanyHR(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;
        const CompanyHR_signup = await CompanyHR.create({
            firstname,
            lastname,
            email,
            password: bcrypt.hashSync(password, 8)
        });
        res.status(201).json({ message: 'CompanyHR registered successfully', CompanyHR_signup });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error! Unable to register CompanyHR.' });
    }
};

async function loginCompanyHR(req, res) {
    try {
        const { email, password } = req.body;
        const CompanyHR = await CompanyHR.findOne({ where: { email } });
    
        if(!CompanyHR) {
            return res.status(404).json({ message: 'CompanyHR not found' });
        }
    
        const passwordIsValid = bcrypt.compareSync(password, CompanyHR.password);
    
        if(!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ id:CompanyHR.id, email: CompanyHR.email, firstname: CompanyHR.firstname, lastname: CompanyHR.lastname }, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(token);
        res.status(200).json({ message: 'CompanyHR logged in successfully', token, id: CompanyHR.id ,firstname: CompanyHR.firstname, lastname: CompanyHR.lastname });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Incorrect email or password!' });
    }
};

module.exports = { signupCompanyHR, loginCompanyHR }

