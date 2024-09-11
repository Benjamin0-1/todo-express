const User = require('../models/User');

const isUserActive = async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    
    if (user.deleted_at !== null) { 
        return res.status(403).json({message: 'You account has been deactivated'});
    }

    next();
}

module.exports = isUserActive;
