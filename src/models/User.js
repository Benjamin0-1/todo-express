const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },

    emailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
});

module.exports = User;