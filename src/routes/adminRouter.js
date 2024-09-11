const adminRouter = require('express').Router();
const {disableUserByEmail, enableUserByEmail} = require('../handlers/adminHandler');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

adminRouter
    .post('/disable', disableUserByEmail, isAdmin, isAuthenticated)
    .post('/enable', enableUserByEmail, isAdmin, isAuthenticated)

module.exports = adminRouter;