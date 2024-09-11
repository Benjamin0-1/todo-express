const adminRouter = require('express').Router();
const {disableUserByEmail, enableUserByEmail} = require('../handlers/adminHandler');
const isAdmin = require('../middlewares/isAdmin');
const isUserAuthenticated = require('../middlewares/isUserAuthenticated');

adminRouter
    .post('/disable', disableUserByEmail, isAdmin, isUserAuthenticated)
    .post('/enable', enableUserByEmail, isAdmin, isUserAuthenticated)

module.exports = adminRouter;