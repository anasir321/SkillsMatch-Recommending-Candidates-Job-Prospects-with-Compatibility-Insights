const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Company_HR, AppliedJobs } = require('../models');

const { Company } = require("../models");
const { Jobs } = require("../models");
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

// submit job details (create a new job)
async function submitJob(req, res) {
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
        console.log("req.user from submitJob: ", req.user);
        const { 
            job_title, 
            job_description, 
            job_location, 
            soft_skills_required, 
            work_experience_required, 
            education_required,
            job_type,
            skills_required,
            work_type,
            salary,
            job_status,
            date_posted
        } = req.body;
        console.log("req.body from submitJob: ", req.body);

                // Create a new job instance
                const job = await Jobs.create({
                    job_title,
                    job_description,
                    job_location,
                    soft_skills_required,
                    work_experience_required,
                    education_required,
                    job_type,
                    skills_required,
                    work_type,
                    salary,
                    job_status,
                    date_posted,
                    // Assuming `id` is the user ID associated with the job creator
                    companyHR_id: id
                });

                console.log("job from submitJob: ", job);
        
                // Save the job to the database
                // await job.save();

        return res.status(201).json({
            success: true,
            message: "Job Posted Successfully",
            data: { job },
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// edit job details (edit existing job details)
async function editJob(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation Failed",
                errors: errors.array(),
            });
        }

        const { job_id } = req.params;
        const job = await Jobs.findOne({
            where: {
                job_id
            }
        });
        
        const { id } = req.user;
        console.log("req.user from editJob: ", req.user);
        const { 
            job_title, 
            job_description, 
            job_location, 
            soft_skills_required, 
            work_experience_required, 
            education_required,
            job_type,
            skills_required,
            work_type,
            salary,
            job_status,
            date_posted
        } = req.body;
        console.log("req.body from editJob: ", req.body);

        // Check if a job exists for the current companyHR_id
        // let job = await Jobs.findOne({ where: { companyHR_id: id } });
        
        if (job) {
            // Update existing job details
            job.job_title = job_title;
            job.job_description = job_description;
            job.job_location = job_location;
            job.soft_skills_required = soft_skills_required;
            job.work_experience_required = work_experience_required;
            job.education_required = education_required;
            job.job_type = job_type;
            job.skills_required = skills_required;
            job.work_type = work_type;
            job.salary = salary;
            job.job_status = job_status;
            job.date_posted = date_posted;
            
            await job.save();

            console.log("Updated job from editJob: ", job);

            return res.status(200).json({
                success: true,
                message: "Job Updated Successfully",
                data: { job },
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// code of API to get jobs posted by particular companyHR_id
async function getJobsbyCompanyHR(req, res) {
    try {
        const { id } = req.user;
        // console.log("req.user from getJobs: ", req.user);
        const jobs = await Jobs.findAll({
            where: {
                companyHR_id: id
            }
        });
        console.log("jobs from getJobs: ", jobs);
        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: { jobs },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// code of API to get all jobs posted by all companyHRs
async function getAllJobs(req, res) {
    try {
        const jobs = await Jobs.findAll();
        console.log("jobs from getAllJobs: ", jobs);
        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: { jobs },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "getAllJobs :: Internal Server Error" });
    }
}

async function getJobDetailsUsingId(req, res) {
    try {
        const { job_id } = req.params;
        const job = await Jobs.findOne({
            where: {
                job_id
            }
        });
        console.log("job from getJobDetailsUsingId: ", job);
        return res.status(200).json({
            success: true,
            message: "Job fetched successfully",
            data: { job },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteJobUsingId(req, res) {
    try {
        const { job_id } = req.params;

        console.log("job_id from deleteJobUsingId: ", job_id);

        const job = await Jobs.findOne({
            where: {
                job_id
            }
        });
        
        if (!job){
            return res.status(404).json({message: "Job not found"})
        }

        if(job.companyHR_id !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to delete this job"})
        }

        await job.destroy();
        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function countJobsUsingCompanyHRId(req, res) {
    try {
        // Extract the companyHR_id from the request parameters
        const companyHR_id = parseInt(req.params.id, 10);

        if (!companyHR_id) {
            return res.status(400).json({ message: "companyHR_id is required" });
        }

        // Count the number of jobs in the Jobs model with the given companyHR_id
        const jobCount = await Jobs.count({
            where: {
                companyHR_id: companyHR_id, // Count records where companyHR_id matches
            }
        });

        // Respond with the count of jobs
        res.status(200).json({ jobCount });
    } catch (error) {
        // Handle errors (e.g., database errors)
        console.error(error);
        res.status(500).json({ message: "An error occurred while counting jobs" });
    }
}

async function getJobsByCompanyHRId(req, res) {
    try {
        // Extract companyHR_id from the request body
        // const { companyHR_id } = req.body;
        const companyHR_id = parseInt(req.params.id, 10);

        // Validate that companyHR_id is provided
        if (!companyHR_id) {
            return res.status(400).json({ message: "companyHR_id is required" });
        }

        // Retrieve all jobs from the Jobs model with the given companyHR_id
        const jobs = await Jobs.findAll({
            where: {
                companyHR_id: companyHR_id, // Match companyHR_id
            },
            attributes: [
                'job_id',
                'job_title',
                'job_description',
                'job_location',
                'soft_skills_required',
                'work_experience_required',
                'education_required',
                'job_type',
                'skills_required',
                'work_type',
                'salary',
                'job_status',
                'date_posted',
            ], // Specify the attributes you want to return
        });

        // Respond with the list of jobs
        res.status(200).json({ jobs });
    } catch (error) {
        // Handle errors (e.g., database errors)
        console.error(error);
        res.status(500).json({ message: "An error occurred while retrieving jobs" });
    }
}


// -----------------------------------------------------------------------
// Import required modules
const { google } = require("googleapis");
// const fs = require("fs");

// Get paths from environment variables
// const GOOGLE_CLIENT_SECRET_PATH = process.env.GOOGLE_CLIENT_SECRET_PATH;
// const TOKEN_PATH = process.env.TOKEN_PATH;

// Load credentials from JSON file
const credentials = JSON.parse(
  fs.readFileSync("/home/faris/SkillsMatch-Recommending-Candidates-Job-Prospects-with-Compatibility-Insights/backend/client_secret_924825865240-3qavb2lveu8mmj156l2f4aphucqhurh2.apps.googleusercontent.com.json")
);
// Read credentials from the JSON file
// const credentials = JSON.parse(fs.readFileSync(GOOGLE_CLIENT_SECRET_PATH));

// Set up OAuth2 client
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Set token if you already have one, otherwise generate a new one
const token = fs.readFileSync("/home/faris/SkillsMatch-Recommending-Candidates-Job-Prospects-with-Compatibility-Insights/backend/token.json");
// const token = fs.readFileSync(TOKEN_PATH);
oAuth2Client.setCredentials(JSON.parse(token));

// Create Gmail API instance
const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

// Function to decode email body
function decodeBody(body) {
  const buff = Buffer.from(body, "base64");
  return buff.toString("utf-8");
}

// // Define the async function to get jobs by career officers
// async function getJobsByCareerOfficers(req, res) {
//   try {
//     // Retrieve emails
//     const response = await gmail.users.messages.list({
//       userId: "skillsmatch20@gmail.com",
//     });

//     const messages = response.data.messages;

//     // Array to store email data
//     const emails = [];

//     // If there are messages, process them
//     if (messages) {
//       for (const message of messages) {
//         const messageData = await gmail.users.messages.get({
//           userId: "skillsmatch20@gmail.com",
//           id: message.id,
//         });

//         const headers = messageData.data.payload.headers;
//         const subject = headers.find((header) => header.name === "Subject").value;

//         // Find the part containing the body text
//         const bodyPart = messageData.data.payload.parts.find(
//           (part) => part.mimeType === "text/plain"
//         );

//         // Extract and decode the body content
//         const body = bodyPart.body.data;
//         const decodedBody = decodeBody(body);

//         // Push email data to the array
//         emails.push({ subject, body: decodedBody });
//       }

//       // Send the response with the email data
//       res.json(emails);
//     } else {
//       // Send an empty array if there are no messages
//       res.json([]);
//     }
//   } catch (error) {
//     // Handle errors
//     console.error("Error fetching emails:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// Define the async function to get jobs by career officers
async function getJobsByCareerOfficers(req, res) {
    try {
      // Retrieve emails with a specific label
      const response = await gmail.users.messages.list({
        userId: "skillsmatch20@gmail.com",
        // labelId: "job", // Replace "YOUR_LABEL
        // labelIds: ["job"], // Replace "YOUR_LABEL_ID_HERE" with the ID of the label you want to filter by
      });
  
      const messages = response.data.messages;
    //   console.log("messages from getJobsByCareerOfficers: ", messages)
  
      // Array to store email data
      const emails = [];
  
      // If there are messages, process them
      if (messages) {
        for (const message of messages) {
          const messageData = await gmail.users.messages.get({
            userId: "skillsmatch20@gmail.com",
            id: message.id,
          });
  
          const headers = messageData.data.payload.headers;
          const subject = headers.find((header) => header.name === "Subject").value;
  
          // Find the part containing the body text
          const bodyPart = messageData.data.payload.parts.find(
            (part) => part.mimeType === "text/plain"
          );
  
          // Extract and decode the body content
          const body = bodyPart.body.data;
          const decodedBody = decodeBody(body);
  
          // Push email data to the array
          emails.push({ subject, body: decodedBody });
        }

        // console.log("emails from getJobsByCareerOfficers: ", emails)
  
        // Send the response with the email data
        res.status(200).json(emails);
      } else {
        // Send an empty array if there are no messages
        res.json([]);
      }
    } catch (error) {
      // Handle errors
      console.error("Error fetching emails:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  

module.exports = { 
    submitJob,
    getJobsbyCompanyHR,
    getAllJobs,
    getJobDetailsUsingId,
    editJob,
    deleteJobUsingId,
    countJobsUsingCompanyHRId,
    getJobsByCompanyHRId,
    getJobsByCareerOfficers
}