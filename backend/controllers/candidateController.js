const { Candidate } = require('../models');

// Create a new candidate
async function createCandidate(req, res) {
    const { dateOfBirth, email, education, skills, work_experience, gender, location, social_profile_link  } = req.body;
    const { id: user_id } = req.user;

    try {
        const candidate_created = await Candidate.create({
            user_id,
            dateOfBirth,
            email,
            education,
            skills,
            work_experience,
            gender,
            location,
            social_profile_link,
        });

        res.status(201).json({ message: 'Candidate created successfully', candidate_created });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Candidate not created, sorry!' });
    }

}

module.exports = { createCandidate };