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

module.exports = { 
    submitJob,
    getJobsbyCompanyHR,
    getAllJobs,
    getJobDetailsUsingId,
    editJob,
    deleteJobUsingId
}