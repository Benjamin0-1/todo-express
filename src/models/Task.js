const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Task = sequelize.define('Task', {
    tittle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    createdAt: {
        type: DataTypes.DATE,
        defailtValue: DataTypes.NOW
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Task;