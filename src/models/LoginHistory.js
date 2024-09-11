const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const LoginHistory = sequelize.define('LoginHistory', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    loginTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    ipAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIP: true
        }
    },

    userAgent: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = LoginHistory;
