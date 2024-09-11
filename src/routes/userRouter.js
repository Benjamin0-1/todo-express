const userRouter = require('express').Router();
const {login, signup, refreshAccessToken, viewProfile, seeLoginHistory, activityHistory} = require('../handlers/userHandler');
const isUserActive = require('../middlewares/isUserActive');
const isAuthenticated = require('../middlewares/isAuthenticated');
const limiter = require('../middlewares/loginRateLimiter');

userRouter
    .post('/login', limiter,login) 
    .post('/signup', signup)
    .post('/refresh', refreshAccessToken)
    .get('/profile', isAuthenticated, isUserActive, viewProfile)
    .get('/login-history', isAuthenticated, isUserActive, seeLoginHistory)
    .get('/activity-history', isAuthenticated, isUserActive, activityHistory);

module.exports = userRouter;
