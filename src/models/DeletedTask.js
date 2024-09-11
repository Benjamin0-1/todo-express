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

    createdAt: {
        type: DataTypes.DATE,
        defailtValue: DataTypes.NOW
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = DeletedTask;

