const adminRouter = require('express').Router();
const {disableUserByEmail, enableUserByEmail, seeActiveUsers, seeDisabledUsers} = require('../handlers/adminHandler');
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');

adminRouter
    .post('/disable', disableUserByEmail, isAdmin, isAuthenticated)
    .post('/enable', enableUserByEmail, isAdmin, isAuthenticated)
    .get('/disabled', seeDisabledUsers, isAdmin, isAuthenticated)
    .get('/active', seeActiveUsers, isAdmin, isAuthenticated);

module.exports = adminRouter;