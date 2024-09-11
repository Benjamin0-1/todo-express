const User = require('../models/User');
const Admin = require('../models/Admin');
const AuditLog = require('../models/AuditLog');
const { Op } = require('sequelize');


const disableUserByEmail = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        };

        if (user.deleted_at !== null) {
            return res.status(400).json({message: 'User already deactivated'});
        }

        const isUserAdmin = await Admin.findOne({where: {userId: user.id}});
        if (isUserAdmin) {
            return res.status(403).json({message: 'You cannot deactivate an admin'});
        };

        await User.update({deleted_at: new Date()}, {where: {email}});

        await AuditLog.create({action: `User disabled :${email}`, userId: user.id, ipAddress: req.ip});

        return res.status(200).json({message: 'User deactivated'});

    } catch (error) {
        return res.status(500).json({message:  `Internal server error: ${error}`});
    }
};

const enableUserByEmail = async (req, res) => {
    const email = req.body.email;

    try {
        
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        };

        if (user.deleted_at === null) {
            return res.status(400).json({message: 'User already activated'});
        };

        await User.update({deleted_at: null}, {where: {email}});

        await AuditLog.create({action: `User enabled :${email}`, userId: user.id, ipAddress: req.ip});

        return res.status(200).json({message: `User ${email} enabled`});

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

const seeDisabledUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                deleted_at: {
                    [Op.ne]: null
                }
            },
            attributes: {exclude: ['password']}
        });

        if (users.length === 0) {
            return res.status(404).json({message: 'No disabled users found'});
        };


        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
};

const seeActiveUsers = async(req, res) => {
    try {

        const users = await User.findAll({
            where: {
                deleted_at: null
            },
            attributes: {exclude: ['password']}
        })

        if (users.length === 0) {
            return res.status(404).json({message: 'No active users found'});
        };

        return res.status(200).json(users);
        
    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
};

const grantAdminPrivileges = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({message: 'Missing required information'});
    };

    try {
        
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        };

        const admin = await Admin.findOne({where: {userId: user.id}});

        if (admin) {
            return res.status(400).json({message: 'User is already an admin'});
        };

        await Admin.create({userId: user.id});

        await AuditLog.create({action: `Admin privileges granted to ${email}`, userId: user.id, ipAddress: req.ip});

        return res.status(200).json({message: `Admin privileges granted to ${email}`});

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
        
    }
};

module.exports = {
    disableUserByEmail,
    enableUserByEmail,
    seeDisabledUsers,
    seeActiveUsers,
    grantAdminPrivileges
};
