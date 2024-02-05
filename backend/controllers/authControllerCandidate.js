const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Candidate } = require("../models");
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
    cb('Error: Images Only!');
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

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Candidate details retrieved successfully",
      data: { candidate },
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
      education,
      skills,
      experience,
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
    candidate.education = education;
    candidate.skills = skills;
    candidate.experience = experience;
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

const uploadProfilePicture = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      if (req.file == undefined) {
        return res.status(400).json({ message: 'No file selected' });
      } else {
        try {
          const { id } = req.user;
          const candidate = await Candidate.findOne({ where: { candidate_id: id } });

          if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
          }

          candidate.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;

          await Candidate.sequelize.transaction(async (t) => {
            await candidate.save({ transaction: t });
          });

          return res.status(200).json({
            message: 'Profile picture uploaded successfully',
            profilePicture: candidate.profilePicture,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error! Unable to upload profile picture.' });
        }
      }
    }
  });
};

// async function getProfilePicture(req, res) {
//   try {
//     const { id } = req.user;
//     const candidate = await Candidate.findOne({ where: { candidate_id: id } });

//     if (!candidate) {
//       return res.status(404).json({ message: 'Candidate not found' });
//     }

//     if (!candidate.profilePicture) {
//       return res.status(404).json({ message: 'Profile picture not found' });
//     }

//     const filePath = path.resolve(candidate.profilePicture);

//     console.log('filePath Nigger: ', filePath);

//     // Check if the file exists
//     // try {
//     //   await fs.promises.access(filePath, fs.constants.F_OK);
//     // } catch (error) {
//     //   return res.status(404).json({ message: 'Profile picture file not found' });
//     // }

//     // Send the file directly as a response
//     res.sendFile(filePath);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error! Unable to retrieve profile picture.' });
//   }
// }

async function getProfilePicture(req, res) {
  try {
    const { id } = req.user;
    const candidate = await Candidate.findOne({ where: { candidate_id: id } });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    if (!candidate.profilePicture) {
      return res.status(404).json({ message: 'Profile picture not found' });
    }

    // Assuming your root directory is 'D:\SkillsMatch - FYP\SkillsMatch\backend'
    const rootDirectory = 'D:\\SkillsMatch - FYP\\SkillsMatch\\backend';
    const filePath = path.join(rootDirectory, candidate.profilePicture);
    console.log('filePath: ', filePath);

    // Check if the file exists
    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
    } catch (error) {
      return res.status(404).json({ message: 'Profile picture file not found' });
    }

    // Send the file directly as a response
    res.status(200).json({ filePath });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error! Unable to retrieve profile picture.' });
  }
}

module.exports = {
  signupCandidate,
  loginCandidate,
  getCandidateDetails,
  updateCandidateDetails,
  uploadProfilePicture,
  getProfilePicture,
};
