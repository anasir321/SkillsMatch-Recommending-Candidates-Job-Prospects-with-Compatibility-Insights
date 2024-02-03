// Import the User model
const { User } = require('../models');

// Create a new user
async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Search for users by name or email
exports.searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ],
        });
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a user by ID
async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract and return firstName and lastName
        const { firstname, lastname } = user;

        res.status(200).json({ firstname, lastname });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const jwt = require('jsonwebtoken');

const getUserDetails = (req, res) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const tokenValue = token.split(' ')[1]; // Extract the token value

  try {
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const { email, firstname, lastname } = decoded;
    res.status(200).json({ email, firstname, lastname });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Token is not valid' });
  }
};


module.exports = { createUser, getUserDetails };

