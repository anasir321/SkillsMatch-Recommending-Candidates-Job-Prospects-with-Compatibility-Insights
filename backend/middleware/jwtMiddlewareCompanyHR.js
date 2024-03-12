const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtMiddlewareCompanyHR = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const tokenValue = token.split(' ')[1]; // Extract the token value

    try {
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log("decoded: ",decoded);

        if(decoded.exp < Date.now().valueOf() / 1000){
            return res.status(401).json({ message: 'Token has expired' });
        }

        if(decoded.role === 'companyHR'){
            req.user = {id: decoded.id, role: decoded.role};
            next();
        }else {
            res.status(401).json({ message: 'User is not a companyHR' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = jwtMiddlewareCompanyHR;
