const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const AuditLog = sequelize.define('AuditLog', {
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    actionTakenAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    ipAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIP: true
        }
    }
});

module.exports = AuditLog;
