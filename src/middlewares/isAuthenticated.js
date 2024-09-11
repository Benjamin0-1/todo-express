const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access-secret';


const isAuthenticated = async (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get the token part from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    try {

        const decoded = jwt.verify(token, ACCESS_SECRET);
        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized, user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized, error verifying token' });
    }
};


module.exports = isAuthenticated;

