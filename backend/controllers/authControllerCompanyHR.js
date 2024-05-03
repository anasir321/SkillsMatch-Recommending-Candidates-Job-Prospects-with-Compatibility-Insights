const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Company_HR, AppliedJobs, Candidate } = require('../models');
const { Company, SavedCandidates } = require("../models");
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();
// COMPANY HR

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
    
        var passwordIsValid = bcrypt.compareSync(password, CompanyHR.password);

        if(password === CompanyHR.password) {
            passwordIsValid = true;
        }
    
        if(!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ id:CompanyHR.companyHR_id, email: CompanyHR.email, firstname: CompanyHR.firstname, lastname: CompanyHR.lastname, role: "companyHR" }, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log(token);
        res.status(200).json({ message: 'Company_HR logged in successfully', token, id: CompanyHR.companyHR_id ,firstname: CompanyHR.firstname, lastname: CompanyHR.lastname, role: "companyHR" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Incorrect email or password!' });
    }
};

// get companyHR details
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

// get company details
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

//  save company details (if company exists, update the details) - for MyProfile (company profile) page from dashboard
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
        const { 
            company_name, 
            company_location, 
            company_email, 
            company_website, 
            company_linkedin, 
            company_description,
            company_size,
            company_facebook,
            company_instagram,
            company_twitter,
            company_phone,
            company_founded_date
        } = req.body;
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
                company_size,
                company_facebook,
                company_instagram,
                company_twitter,
                company_phone,
                company_founded_date
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
        company.company_size = company_size || '';
        company.company_facebook = company_facebook || '';
        company.company_instagram = company_instagram || '';
        company.company_twitter = company_twitter || '';
        company.company_phone = company_phone || '';
        company.company_founded_date = company_founded_date || '';

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/company-logo");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  }

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("profilePicture");

// function to upload company profile picture
const uploadCompanyProfilePicture = (req, res) => {
    upload(req, res, async (err) => {
        if(err) {
            return res.status(500).json({ message: err });
        } else{
            if(req.file == undefined) {
                return res.status(400).json({ message: 'No file selected' });
            } else {
                try{
                    const { id } = req.user;
                    console.log("trying to find pic of this user id: ", id)
                    const company = await Company.findOne({ 
                        where: { companyHR_id: id } 
                    });
                    if (!company) {
                        return res.status(404).json({ message: 'Company not found' });
                    }
                    
                    company.company_logo = `uploads/company-logo/${req.file.filename}`;

                    await Company.sequelize.transaction(async (t) => {
                        await company.save({ transaction: t });
                    });

                    return res.status(200).json({
                        message: "Company logo uploaded successfully",
                        profilePicture: company.company_logo,
                    })

                } catch (error) {
                    console.error(error);
                    return res
                        .status(500)
                        .json({ message: "Error! Unable to upload company profile picture." });
                }
            }
        }
    })
}

// function to get company profile picture
async function getCompanyProfilePicture(req, res) {
    try {
        const {id} = req.user;
        const company = await Company.findOne({ where: {companyHR_id: id}});

        if(!company) {
            return res.status(404).json({message: "Company not found :: getCompanyProfilePicture"});
        }

        if (!company.company_logo) {
            return res.status(404).json({ message: "Profile picture not found :: getCompanyProfilePicture" });
        }

        // Relative path from the static route or public directory
        const relativePath = `${company.company_logo}`;

        // Send the relative path directly as a response
        res.status(200).json({ filePath: relativePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error! Unable to get company profile picture." });
    }
}

// get all companies
async function getAllCompanies(req, res) {
    try {
        const companies = await Company.findAll();
        if(!companies){
            return res.status(404).json({ message: "No companies found" });
        }
        res.status(200).json({ message: "All companies retrieved successfully", data: { companies } })
    } catch (error) {
        console.log("getAllCompanies :: error getting companies ", error)
        res.status(500).json({ message: "Error! Unable to get all companies." });
    }
}

// get company profile picture by using id
async function getCompanyProfilePictureUsingId(req, res){
    try {
        const {id} = req.params;
        const company = await Company.findOne({ where: {companyHR_id: id}});
        if(!company){
            return res.status(404).json({ message: "Company not found" });
        }
        if (!company.company_logo) {
            return res.status(404).json({ message: "Profile picture not found" });
        }
        // Relative path from the static route or public directory
        const relativePath = `${company.company_logo}`;

        // Send the relative path directly as a response
        res.status(200).json({
            message: "Company profile picture retrieved successfully",
        data: { filePath: relativePath },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error! Unable to get company profile picture." });
    }
}

// get company details by using id
async function getCompanyDetailsUsingId(req, res) {
    try {
        const {id} = req.params;
        const company = await Company.findOne({ where: {companyHR_id: id}});
        if(!company){
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({
            message: "Company details retrieved successfully",
            data: { company },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error! Unable to get company details." });
    }
}
//get candidate detail using email
async function getCandidateDetailsUsingEmail(req, res) {
    try {
        const {email} = req.params;
        const company = await Candidate.findOne({ where: {email: email}});
        if(!company){
            return res.status(404).json({ message: "Candidate not found" });
        }
        res.status(200).json({
            message: "Candidate details retrieved successfully",
            data: { company },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error! Unable to get Candidate details." });
    }
}

// get applicants using JobId
// async function getApplicantsUsingJobId(req, res) {
//     try {
//         const job_id = parseInt(req.params.job_id, 10);
//         // const applicants = await AppliedJobs.findAll({ where: {job_id: job_id}});
//         const applicants = await AppliedJobs.findAll({ where: {job_id: job_id}});

//         console.log("getApplicantsUsingJobId :: job_id: ", job_id)
//         console.log("getApplicantsUsingJobId :: applicants: ", applicants);

//         if(!applicants){
//             return res.status(404).json({ message: "No applicants found" });
//         }
//         res.status(200).json({
//             message: "Applicants retrieved successfully",
//             data: { applicants },
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error! Unable to get applicants." });
//     }
// }

async function getApplicantsUsingJobId(req, res) {
    try {
        const job_id = parseInt(req.params.job_id, 10);
        
        // Step 1: Retrieve applicant records with the specified job_id
        const applicants = await AppliedJobs.findAll({ where: { job_id: job_id } });
        
        console.log("getApplicantsUsingJobId :: job_id: ", job_id);
        console.log("getApplicantsUsingJobId :: applicants: ", applicants);
        
        if (!applicants || applicants.length === 0) {
            return res.status(404).json({ message: "No applicants found" });
        }
        
        // Step 2: Extract the candidate_ids from the applicants
        const candidate_id = applicants.map(applicant => applicant.candidate_id);

        console.log("getApplicantsUsingJobId :: candidate_id: ", candidate_id);
        
        // Step 3: Retrieve candidates using the candidate_ids
        const candidates = await Candidate.findAll({ where: { candidate_id: candidate_id } });

        console.log("getApplicantsUsingJobId :: candidates: ", candidates);
        
        if (!candidates || candidates.length === 0) {
            return res.status(404).json({ message: "No candidates found" });
        }

        // Step 4: Send the retrieved candidates in the response
        res.status(200).json({
            message: "Candidates retrieved successfully",
            data: { candidates },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error! Unable to get candidates." });
    }
}

// save Candidate
async function saveCandidate(req, res) {
    try {
        const {company_hr_id, job_id, candidate_id} = req.body;

        console.log("saveCandidate :: req.body: ", req.body);

        if (!company_hr_id || !job_id || !candidate_id) {
            return res.status(400).json({ message: "Please provide all the details" });
        }

        var companyHR_id = company_hr_id;

        const existingRecord = await SavedCandidates.findOne({
            where: {
                companyHR_id,
                candidate_id,
                job_id,
            },
        });

        if (existingRecord) {
            return res.status(409).json({ error: 'Candidate is already saved for this job and companyHR_id' });
        }

         // Create a new record in the SavedCandidates table
         const newSavedCandidate = await SavedCandidates.create({
            companyHR_id,
            candidate_id,
            job_id,
        });

        return res.status(201).json(newSavedCandidate);
    } catch (error) {
         // Handle errors and send an error response
         console.error('Error saving candidate data:', error);
         return res.status(500).json({ error: 'An error occurred while saving the candidate data' });
    }
}

// API function to unsave candidate data
async function unsaveCandidate(req, res) {
    try {
        // Extract data from the request body
        const { company_hr_id, job_id, candidate_id } = req.body;

        console.log("unsaveCandidate :: req.body: ", req.body);

        // Validate the data
        if (!company_hr_id || !job_id || !candidate_id) {
            return res.status(400).json({ message: "Please provide all the details" });
        }

        var companyHR_id = company_hr_id;

        // Find the record to be deleted in the SavedCandidates table
        const existingRecord = await SavedCandidates.findOne({
            where: {
                companyHR_id,
                candidate_id,
                job_id,
            },
        });

        // If the record does not exist, return a 404 error
        if (!existingRecord) {
            return res.status(404).json({ error: 'Candidate not found for this job and companyHR_id' });
        }

        // Delete the record from the SavedCandidates table
        await existingRecord.destroy();

        // Send a success response after deletion
        return res.status(200).json({ message: 'Candidate unsaved successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error('Error unsaving candidate data:', error);
        return res.status(500).json({ error: 'An error occurred while unsaving the candidate data' });
    }
}



module.exports = { 
    signupCompanyHR, 
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
}

