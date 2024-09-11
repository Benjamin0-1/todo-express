const User = require('../models/User');
const LoginHistory = require('../models/LoginHistory');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize')
require('dotenv').config();

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access-secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret';

const login = async (req, res) => { 
    const {email, password} = req.body;

    try {
        
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        };

        if (user.deleted_at !== null) {
            return res.status(403).json({message: 'Your account has been deactivated'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Invalid credentials'});
        };

        await LoginHistory.create({
            userId: user.id,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            email: user.email
        });


        const accessToken = jwt.sign({email: user.email, id: user.id}, ACCESS_SECRET, {expiresIn: '1h'});
        const refreshToken = jwt.sign({email: user.email, id: user.id}, REFRESH_SECRET, {expiresIn: '7d'});

        return res.status(200).json({accessToken, refreshToken});

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
        
    }
};

const signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({message: 'Please fill all fields'});
    };

    if (!emailRegex.test(email)) {
        return res.status(400).json({message: 'Invalid email address'});
    };

    if (password.length < 5) {
        return res.status(400).json({message: 'Password must be at least 5 characters'});
    };

    try {
        
        const user = await User.findOne({where: {email}});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({message: 'User created successfully'});


    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

const refreshAccessToken = async (req, res) => {
    const {refreshToken} = req.body;

    if (!refreshToken) {
        return res.status(400).json({message: 'Invalid request'});
    }

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
        const accessToken = jwt.sign({email: decoded.email}, ACCESS_SECRET, {expiresIn: '1h'});

        return res.status(200).json({accessToken});

    } catch (error) {
        return res.status(401).json({message: 'Invalid refresh token'});
    }
};

const viewProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        
        const userInfo = await User.findOne({
            where: {id: userId},
            attributes: {exclude: ['password']}
        });

        return res.status(200).json(userInfo);


    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

const seeLoginHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        
        const loginHistory = await LoginHistory.findAll({
            where: {userId},
            order: [['createdAt', 'DESC']]
        });

        if (loginHistory.length === 0) {
            return res.status(404).json({message: 'No login history found'});
        }

        return res.status(200).json(loginHistory);

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};


module.exports = {
    login,
    signup,
    refreshAccessToken,
    viewProfile,
    seeLoginHistory
};
