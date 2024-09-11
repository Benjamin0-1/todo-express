const userRouter = require('express').Router();
const {login, signup, refreshAccessToken, viewProfile, seeLoginHistory} = require('../handlers/userHandler');
const isUserActive = require('../middlewares/isUserActive');
const isAuthenticated = require('../middlewares/isAuthenticated');
const limiter = require('../middlewares/loginRateLimiter');

userRouter
    .post('/login', limiter,login) 
    .post('/signup', signup)
    .post('/refresh', refreshAccessToken)
    .get('/profile', isAuthenticated, isUserActive, viewProfile)
    .get('/login-history', isAuthenticated, isUserActive, seeLoginHistory);

module.exports = userRouter;
