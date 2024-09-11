const User = require('../models/User');
const Admin = require('../models/Admin');

const isAdmin = async (req, res, next) => {
    const userId = req.user.id;
    const admin = await Admin.findOne({where: {userId}});
    if (!admin) {
        return res.status(403).json({message: 'Forbidden'});
    };
    next();
};

module.exports = isAdmin;
