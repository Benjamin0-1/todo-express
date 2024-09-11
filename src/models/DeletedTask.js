const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const DeletedTask = sequelize.define('DeletedTask', {
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
        allowNull: false
    },

    createdAt: {
        type: DataTypes.DATE,
        defailtValue: DataTypes.NOW
    },
});

module.exports = DeletedTask;

