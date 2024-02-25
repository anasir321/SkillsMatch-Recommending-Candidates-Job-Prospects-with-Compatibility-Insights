const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Company_HR } = require('../models');
const { Company } = require("../models");
const { Jobs } = require("../models");
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

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

// code of API to get jobs posted by porticular companyHR_id
async function getJobsbyCompanyHR(req, res) {
    try {
        const { id } = req.user;
        console.log("req.user from getJobs: ", req.user);
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

module.exports = { 
    submitJob,
    getJobsbyCompanyHR
}