const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

async function signup(req, res) {
    try {
        const { firstname, lastname, email, password } = req.body;
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: bcrypt.hashSync(password, 8)
        });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong, sorry' });
    }
};

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
    
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        const passwordIsValid = bcrypt.compareSync(password, user.password);
    
        if(!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ id:user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Incorrect email or password!' });
    }
};

module.exports = { signup, login }

