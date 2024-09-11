const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access-secret';


const isAuthenticated = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
        return res.status(401).json({message: 'Unauthorized'});
    };

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const user = await User.findOne({where: {email: decoded.email}});
        if (!user) {
            return res.status(401).json({message: 'Unauthorized'});
        };
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'});
    }
};


module.exports = isAuthenticated;

