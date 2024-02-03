const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const tokenValue = token.split(' ')[1]; // Extract the token value

    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = {id: decoded.id};
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = jwtMiddleware;
