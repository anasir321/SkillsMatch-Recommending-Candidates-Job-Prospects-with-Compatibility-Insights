const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Candidate, Institute, WorkExperience } = require("../models");

const dotenv = require("dotenv");

const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile-pictures");
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

async function loginCandidate(req, res) {
  try {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({ where: { email } });

    if (!candidate) {
      return res.status(404).json({ message: "candidate not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, candidate.password);

    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: candidate.candidate_id,
        email: candidate.email,
        firstname: candidate.firstname,
        lastname: candidate.lastname,
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
      password,
      location,
      softSkills,
      linkedinURL,
      githubURL,
      preferredJobType,
      preferredJobTitle,
      gender,
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

const updateCandidateEducationDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const { institute_name, degree_program, duration } = req.body;

    const candidate = await Candidate.findOne({
      where: { candidate_id: id },
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    let institute = await Institute.findOne({
      where: { candidate_id: id, institute_name, degree_program },
    });

    if (!institute) {
      institute = await Institute.create({
        institute_name,
        degree_program,
        duration,
        candidate_id: id,
      });
    } else {
      institute.institute_name = institute_name;
      institute.degree_program = degree_program;
      institute.duration = duration;
      await institute.save();
    }

    return res.status(200).json({
      message: "Education details updated successfully",
      data: { institute },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error! Unable to update education details" });
  }
};

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
    const relativePath = `${candidate.profilePicture}`;

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

module.exports = {
  signupCandidate,
  loginCandidate,
  getCandidateDetails,
  updateCandidateDetails,
  updateCandidateEducationDetails,
  updateCandidateWorkExperience,
  uploadProfilePicture,
  getProfilePicture,
  getAllCandidates,
  getProfilePictureUsingId,
  getCandidateDetailsUsingId,
};
