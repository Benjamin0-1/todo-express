const User = require('../models').User;

const isEmailConfirmed = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await User.findOne({where: {id: userId}});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        };

        if (!user.emailConfirmed) {
            return res.status(403).json({message: 'Email not confirmed'});
        };

        next();

    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = isEmailConfirmed;
