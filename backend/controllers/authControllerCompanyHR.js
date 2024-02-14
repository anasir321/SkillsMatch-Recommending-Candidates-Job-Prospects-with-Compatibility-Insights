const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Company_HR } = require('../models');
const { Company } = require("../models");
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');


dotenv.config();
    // signup
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
    // login
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

// COMPANY 
async function getCompanyDetails(req, res) {
    try {
      console.log("req.user in getCompanyDetails: ", req.user);
      const { id } = req.user; // User ID from JWT payload
      const company = await Company.findOne({ where: { companyHR_id: id }});

      console.log("Retrieved company: ", company)
  
      if (!company) {
        return res.status(404).json({
          success: false,
          message: "Company not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Company details retrieved successfully",
        data: { company },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error! Unable to retrieve Company details.",
        error: error.message,
      });
    }
  }

//incomplete saveCompanyDetails
// async function saveCompanyDetails(req, res) {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({
//             success: false,
//             message: "Validation Failed",
//             errors: errors.array(),
//           });
//         }
//     const { id } = req.user;

//     //Extract and validate fields from req.body

//     const {
//         company_name,
//     } = req.body;

//     const company = await Company.findOne({ where: { companyHR_id: id } });

//     if (!company) {
//         return res.status(404).json({
//             success: false,
//             message: "Company not found",
//         });
//     }

//     // Update company fields
//     company.company_name = company_name;

//     await company.sequelize.transaction(async (t) => {
//         await company.save({transaction: t});
//     });

//     res.status(2000).json({
//         success: true,
//         message: "Company details saved sucessfully",
//         data: { company },
//     });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             success: false,
//             message: "Error! Unable to save company details.",
//             error: error.message,
//         })
//     }
// };

async function saveCompanyDetails(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation Failed",
                errors: errors.array(),
            });
        }

        const { id } = req.user;
        const { company_name, company_location, company_email, company_website, company_linkedin, company_description } = req.body;
        console.log("req.body from saveCompanyDetails: ", req.body);

        // Check if company exists for the given companyHR_id
        let company = await Company.findOne({ where: { companyHR_id: id }});

        // If company doesn't exist, create a new one
        if (!company) {
            company = await Company.create({
                companyHR_id: id,
                company_name,
                company_location,
                company_email,
                company_website,
                company_linkedin,
                company_description,
            });

            return res.status(201).json({
                success: true,
                message: "Company created and details saved successfully",
                data: { company },
            });
        }

        // If company exists, update its fields
        company.company_name = company_name || '';
        company.company_location = company_location || '';
        company.company_email = company_email || '';
        company.company_website = company_website || '';
        company.company_linkedin = company_linkedin || '';
        company.company_description = company_description || '';

        await company.save();

        res.status(200).json({
            success: true,
            message: "Company details updated successfully",
            data: { company },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error! Unable to save company details.",
            error: error.message,
        });
    }
}


module.exports = { signupCompanyHR, loginCompanyHR, getCompanyHRDetails, getCompanyDetails, saveCompanyDetails }

