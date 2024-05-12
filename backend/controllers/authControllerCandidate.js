const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Candidate, Institute, WorkExperience, Jobs, AppliedJobs, SavedJobs, Company_HR } = require("../models");

const dotenv = require("dotenv");

const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { get } = require("http");

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile-pictures");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const storageResume = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resumes");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

function checkFileTypeResume(file, cb) {
  // Allowed ext
  const filetypes = /pdf|doc|docx/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Resumes Only!");
  }
}

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

const uploadResumeFile = multer({
  storage: storageResume,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileTypeResume(file, cb);
  },
}).single("resume");

async function signupCandidate(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    const candidate_signup = await Candidate.create({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    res
      .status(201)
      .json({ message: "Candidate registered successfully", candidate_signup });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error! Unable to register candidate." });
  }
}

async function 
loginCandidate(req, res) {
  try {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({ where: { email } });

    if (!candidate) {
      return res.status(404).json({ message: "candidate not found" });
    }

    var passwordIsValid = bcrypt.compareSync(password, candidate.password);

    if(password == candidate.password){
      passwordIsValid = true;
    }

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: candidate.candidate_id,
        email: candidate.email,
        firstname: candidate.firstname,
        lastname: candidate.lastname,
        role: "candidate",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log(token);
    res.status(200).json({
      message: "candidate logged in successfully",
      token,
      id: candidate.candidate_id,
      firstname: candidate.firstname,
      lastname: candidate.lastname,
      role: "candidate",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Incorrect email or password!" });
  }
}

async function getCandidateDetails(req, res) {
  try {
    console.log("req.user: ", req.user);
    const { id } = req.user; // User ID from JWT payload
    const candidate = await Candidate.findOne({ where: { candidate_id: id } });
    const institute = await Institute.findAll({ where: { candidate_id: id } });
    const workExperience = await WorkExperience.findAll({
      where: { candidate_id: id },
    });    

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate details retrieved successfully",
      data: { candidate, institute, workExperience},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to retrieve candidate details.",
      error: error.message,
    });
  }
}

async function getInstituteDetails (req, res){
  try{
    const { id } = req.user;
    const institute = await Institute.findAll({ where: { candidate_id: id } });
    if (!institute){
      return res.status(404).json({ 
        success: false,
        message: "Institute Details not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Institute details retrieved successfully",
      data: { institute },
    });

  } catch (error){
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to retrieve institute details.",
      error: error.message,
    });
  }
}

const getWorkExperienceDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const workExperience = await WorkExperience.findAll({
      where: { candidate_id: id },
    });
    if (!workExperience) {
      return res.status(404).json({
        success: false,
        message: "Work Experience not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Work Experience details retrieved successfully",
      data: { workExperience },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to retrieve work experience details.",
      error: error.message,
    });
  }
}

async function createCandidateWorkExperience(req, res) {
  try {
    const { id } = req.user;
    const workExperience = req.body;

    const candidate = await Candidate.findOne({
      where: { candidate_id: id },
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    for(const detail of workExperience){
      const { company_name, position, duration } = detail;
      const existingDetail = await WorkExperience.findOne({
        where: { candidate_id: id, company_name },
      });

      if (existingDetail) {
        await existingDetail.update({ company_name, position, duration });
      } else {
        await WorkExperience.create({
          company_name,
          position,
          duration,
          candidate_id: id,
        });
      }
    }

    return res.status(200).json({
      message: "Work experience created successfully",
      data: { workExperience },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error! Unable to create work experience" });
  }
}

async function createCandidateEducationDetails(req, res) {
  try {
    const { id } = req.user;
    const educationDetails = req.body; // Assuming req.body contains an array of education details

    const candidate = await Candidate.findOne({
      where: { candidate_id: id },
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Loop through each education detail in the array
    for (const detail of educationDetails) {
      const { institute_name, degree_program, duration } = detail;

      // Check if an education detail with the same institute_id exists for the candidate
      const existingDetail = await Institute.findOne({
        where: { candidate_id: id, institute_name },
      });

      if (existingDetail) {
        // Update the existing education detail
        await existingDetail.update({ institute_name, degree_program, duration });
      } else {
        // Create a new education detail
        await Institute.create({
          institute_name,
          degree_program,
          duration,
          candidate_id: id,
        });
      }
    }

    return res.status(200).json({
      message: "Education details created successfully",
      data: { educationDetails },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error! Unable to create education details" });
  }  
}


async function getCandidateDetailsUsingId(req, res) {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findOne({ where: { candidate_id: id } });
    const institute = await Institute.findAll({ where: { candidate_id: id } });
    const workExperience = await WorkExperience.findAll({
      where: { candidate_id: id },
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate details retrieved successfully",
      data: { candidate, institute, workExperience},
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error! Unable to retrieve candidate details" });
  }
}

async function updateCandidateDetails(req, res) {
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

    // Extract and validate fields from req.body
    const {
      firstname,
      lastname,
      dateOfBirth,
      email,
      skills,
      location,
      softSkills,
      linkedinURL,
      githubURL,
      preferredJobType,
      preferredJobTitle,
      gender,
      overview,
      work_preference,
      experience,
      education_level,
    } = req.body;

    const candidate = await Candidate.findOne({
      where: { candidate_id: id },
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Update candidate fields
    candidate.firstname = firstname;
    candidate.lastname = lastname;
    candidate.dateOfBirth = dateOfBirth;
    candidate.email = email;
    candidate.skills = skills;
    candidate.location = location;
    candidate.softSkills = softSkills;
    candidate.linkedinURL = linkedinURL;
    candidate.githubURL = githubURL;
    candidate.preferredJobType = preferredJobType;
    candidate.preferredJobTitle = preferredJobTitle;
    candidate.gender = gender;
    candidate.overview = overview;
    candidate.work_preference = work_preference;
    candidate.experience = experience;
    candidate.education_level = education_level;

    // if (password) {
    //   const hashedPassword = await bcrypt.hashSync(password, 8);
    //   candidate.password = hashedPassword;
    // }

    await Candidate.sequelize.transaction(async (t) => {
      await candidate.save({ transaction: t });
    });

    res.status(200).json({
      success: true,
      message: "Candidate details updated successfully",
      data: { candidate },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to update candidate details.",
      error: error.message,
    });
  }
}

async function updateCandidateEducationDetails(req, res) {
  try {
    const { id } = req.user;
    const educationDetails = req.body; // Assuming req.body contains an array of education details

    const candidate = await Candidate.findOne({
      where: { candidate_id: id },
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Loop through each education detail in the array
    for (const detail of educationDetails) {
      const { institute_name, degree_program, duration } = detail;

      const institute = await Institute.findOne({
        where: { candidate_id: id },
      });

      if (!institute) {
        return res.status(404).json({ message: "Education detail not found" });
      }

      // Update the education detail
      institute.institute_name = institute_name;
      institute.degree_program = degree_program;
      institute.duration = duration;

      await institute.save();
    }

    return res.status(200).json({
      message: "Education details updated successfully",
      data: { educationDetails },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error! Unable to update education details" });
  }
}


async function updateCandidateWorkExperience(req, res) {
  try {
    const { id } = req.user;
    const { company_name, position, duration } = req.body;

    const candidate = await Candidate.findOne({
      where: { candidate_id: id },
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    let workExperience = await WorkExperience.findOne({
      where: { candidate_id: id, company_name, position },
    });

    if (!workExperience) {
      workExperience = await WorkExperience.create({
        company_name,
        position,
        duration,
        candidate_id: id,
      });
    } else {
      workExperience.company_name = company_name;
      workExperience.position = position;
      workExperience.duration = duration;
      await workExperience.save();
    }

    return res.status(200).json({
      message: "Work experience updated successfully",
      data: { workExperience },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error! Unable to update work experience" });
  }
}

const uploadProfilePicture = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ message: "No file selected" });
      } else {
        try {
          const { id } = req.user;
          const candidate = await Candidate.findOne({
            where: { candidate_id: id },
          });

          if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
          }

          candidate.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;

          await Candidate.sequelize.transaction(async (t) => {
            await candidate.save({ transaction: t });
          });

          return res.status(200).json({
            message: "Profile picture uploaded successfully",
            profilePicture: candidate.profilePicture,
          });
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Error! Unable to upload profile picture." });
        }
      }
    }
  });
};

async function uploadResume(req, res) {
  uploadResumeFile(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ message: "No file selected" });
      } else {
        try {
          const { id } = req.user;
          const candidate = await Candidate.findOne({
            where: { candidate_id: id },
          });

          if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
          }

          candidate.resume = `/uploads/resumes/${req.file.filename}`;

          console.log(candidate.resume);
          console.log("INSIDE UPLOAD RESUME FUNCTION")

          await Candidate.sequelize.transaction(async (t) => {
            await candidate.save({ transaction: t });
          });

          return res.status(200).json({
            message: "Resume uploaded successfully",
            resume: candidate.resume,
          });
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Error! Unable to upload resume." });
        }
      }
    }
  });
}

async function getResume(req, res) {
  try {
    const { id } = req.user;
    const candidate = await Candidate.findOne({ where: { candidate_id: id } });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    if (!candidate.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Relative path from the static route or public directory
    const relativePath = `${candidate.resume}`;

    // Send the relative path directly as a response
    res.status(200).json({ message: "Resume retrieved successfully", filePath: relativePath});
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error! Unable to retrieve resume." });
  }
}

async function getResumeUsingId(req, res) {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findOne({ where: { candidate_id: id } });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    if (!candidate.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    const relativePath = `${candidate.resume}`;
    res.status(200).json({
      message: "Resume retrieved successfully",
      data: { filePath: relativePath },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error! Unable to retrieve resume" });
  }

}

async function getProfilePicture(req, res) {
  try {
    const { id } = req.user;
    const candidate = await Candidate.findOne({ where: { candidate_id: id } });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    if (!candidate.profilePicture) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    // Relative path from the static route or public directory
    // const relativePath = `${candidate.profilePicture}`;

    console.log("Relative path: ", relativePath);

    // Send the relative path directly as a response
    res.status(200).json({ filePath: relativePath });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error! Unable to retrieve profile picture." });
  }
}

async function getProfilePictureUsingId(req, res) {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findOne({ where: { candidate_id: id } });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    if (!candidate.profilePicture) {
      return res.status(404).json({ message: "Profile picture not found" });
    }
    const relativePath = `${candidate.profilePicture}`;
    res.status(200).json({
      message: "Profile picture retrieved successfully",
      data: { filePath: relativePath },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error! Unable to retrieve profile picture" });
  }
}

async function getAllCandidates(req, res) {
  try {
    const candidates = await Candidate.findAll();
    if (!candidates) {
      return res.status(404).json({ message: "No candidates found" });
    }
    res.status(200).json({
      message: "Candidates retrieved successfully",
      data: { candidates },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error! Unable to retrieve candidates" });
  }
}

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

// apply for a job
async function applyJob(req, res) {
  try {
     // Extract job_id and candidate_id from request body
     const { job_id, candidate_id } = req.body;

     // Find the job and candidate in the database
     const job = await Jobs.findByPk(job_id);
     const candidate = await Candidate.findByPk(candidate_id);

     // Check if job and candidate exist
     if (!job) {
         return res.status(404).json({ message: "Job not found" });
     }
     if (!candidate) {
         return res.status(404).json({ message: "Candidate not found" });
     }

     // Check if the candidate has already applied for the job
     const existingApplication = await AppliedJobs.findOne({
         where: {
             job_id,
             candidate_id,
         },
     });

     if (existingApplication) {
         return res.status(201).json({ message: "Candidate has already applied for this job" });
     }

     // Create a new job application
     const application = await AppliedJobs.create({
         job_id,
         candidate_id,
     });

     // Send a success response
     res.status(200).json({
      message: "Candidate successfully applied for the job",
      data: { application },
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error! Unable to retrieve candidates" });
  }
}

async function getAppliedJobs(req, res){
  try{
    const { id } = req.user;
    const appliedJobs = await AppliedJobs.findAll({ where: { candidate_id: id } });
    if (!appliedJobs){
      return res.status(404).json({ 
        success: false,
        message: "Applied Jobs not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Applied Jobs retrieved successfully",
      data: { appliedJobs },
    });
  } catch(error){
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to retrieve applied jobs.",
      error: error.message,
    });
  }
}

async function getJobDetailsUsingCandidateId(req, res){
  try{
    const candidate_id = req.params.candidate_id;

    const appliedJobs = await AppliedJobs.findAll({ where: { candidate_id: candidate_id } });

    if(!appliedJobs){
      return res.status(404).json({
        success: false,
        message: "No jobs found against this candidate"
      });
    }

    // get job_ids of all the jobs applied by the candidate
    const job_ids = appliedJobs.map(job => job.job_id);

    const jobs = await Jobs.findAll({ where: { job_id: job_ids } });

    if(!jobs){
      return res.status(404).json({
        success: false,
        message: "No job details found against this job_id"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job details retrieved successfully",
      data: { jobs },
    });

  } catch(error){
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to retrieve job details.",
      error: error.message,
    });
  }

}

async function saveJob(req,res){
  try{
    const { job_id, candidate_id, companyHR_id, } = req.body;

    const job = await Jobs.findAll({ where: { job_id } });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const savedJob = await SavedJobs.create({
      job_id,
      candidate_id,
      companyHR_id,
    });
    res.status(200).json({
      message: "Job saved successfully",
      data: { savedJob },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error! Unable to save job" });
  }

}

async function unsaveJob(req,res){
  try{
    const { job_id } = req.body;

    const savedJob = await SavedJobs.findAll({ where: { job_id } });

    if (!savedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    await SavedJobs.destroy({ where: { job_id } });

    res.status(200).json({
      message: "Job unsaved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error! Unable to unsave job" });
  }
}

async function isJobSaved(req,res){
  try{
    const { job_id } = req.body;

    const savedJob = await SavedJobs.findOne({ where: { job_id } });

    if (!savedJob) {
      return res.status(200).json({ isJobSaved: false });
    }else {
      return res.status(200).json({ isJobSaved: true });
    }

  } catch(error){
    console.error(error);
    res.status(500).json({ message: "Error! Unable to check if job is saved" });
  }
}

async function getAllSavedJobs(req, res){
  try{
    const { id } = req.user;
    const savedJobs = await SavedJobs.findAll({ where: { candidate_id: id } });
    if (!savedJobs){
      return res.status(404).json({ 
        success: false,
        message: "Saved Jobs not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Saved Jobs retrieved successfully",
      data: { savedJobs },
    });
  } catch(error){
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to retrieve saved jobs.",
      error: error.message,
    });
  }
}

async function getJobDetailsUsingSavedJobs(req, res){
  try{
    const job_id = req.params.job_id;

    const savedJobs = await SavedJobs.findAll({ where: { job_id: job_id } });

    if(!savedJobs){
      return res.status(404).json({
        success: false,
        message: "No jobs found against this job_id"
      });
    }

    // get job_ids of all the jobs applied by the candidate
    const job_ids = savedJobs.map(job => job.job_id);

    const jobs = await Jobs.findAll({ where: { job_id: job_ids } });

    if(!jobs){
      return res.status(404).json({
        success: false,
        message: "No job details found against this job_id"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job details retrieved successfully",
      data: { jobs },
    });

  } catch(error){
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to retrieve job details.",
      error: error.message,
    });
  }
}

// async function recommendCandidateUsingJobId(req, res) {
//   try {
//       const job_id = req.params.job_id;
//       // Step 1: Fetch candidates from API
//       const response = await axios.get(`http://localhost:2004/recommend_candidates/${job_id}`);
//       const recommendedCandidates = response.data.recommended_candidates;
      
//       // Step 2: Extract candidate IDs
//       const candidateIds = recommendedCandidates.map(candidate => candidate.candidate_id);

//       // Step 3: Fetch candidates from the database using Sequelize
//       const candidatesFromDB = await Candidate.findAll({
//           where: {
//               candidate_id: candidateIds // Assuming your Candidate model has candidate_id as the primary key
//           }
//       });

//       return { recommendedCandidates, candidatesFromDB };
//   } catch (error) {
//       console.error('Error:', error);
//       throw new Error('Failed to recommend candidates');
//   }
// }

async function getCandidateDetailsUsingCandidateIdsArray(req, res) {
  try {
    const { candidateIds } = req.body;

    const candidateDetails = await Candidate.findAll({ where: { candidate_id: candidateIds } });

    if (!candidateDetails) {
      return res.status(404).json({
        success: false,
        message: "No candidate details found for the provided candidate IDs",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate details retrieved successfully",
      data: { candidateDetails },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error! Unable to retrieve candidate details.",
      error: error.message,
    });
  }
}


module.exports = {
  signupCandidate,
  loginCandidate,
  getCandidateDetails,
  createCandidateEducationDetails,
  createCandidateWorkExperience,
  updateCandidateDetails,
  updateCandidateEducationDetails,
  updateCandidateWorkExperience,
  uploadProfilePicture,
  getProfilePicture,
  getWorkExperienceDetails,
  getAllCandidates,
  getProfilePictureUsingId,
  getCandidateDetailsUsingId,
  getInstituteDetails,
  getCandidateDetailsUsingEmail,
  uploadResume,
  getResume,
  applyJob,
  getAppliedJobs,
  getJobDetailsUsingCandidateId,
  saveJob,
  unsaveJob,
  isJobSaved,
  getAllSavedJobs,
  getJobDetailsUsingSavedJobs,
  getCandidateDetailsUsingCandidateIdsArray
};
