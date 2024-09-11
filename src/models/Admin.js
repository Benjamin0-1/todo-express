const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Admin = sequelize.define('Admin', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
});

module.exports = Admin;
