const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize({
    database: 'todo2' || process.env.DB_NAME,
    username: 'root' || process.env.DB_USER,
    //password: process.env.DB_PASS,
    host: 'localhost' || process.env.DB_HOST,
    dialect: 'mysql'
});


module.exports = sequelize;
