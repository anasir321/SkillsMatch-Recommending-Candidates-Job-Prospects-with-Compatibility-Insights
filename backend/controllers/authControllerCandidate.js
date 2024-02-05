const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Candidate } = require("../models");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");

dotenv.config();

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

module.exports = {
  signupCandidate,
  loginCandidate,
  getCandidateDetails,
  updateCandidateDetails,
};
