const userRouter = require('express').Router();
const {login, signup, refreshAccessToken, viewProfile} = require('../handlers/userHandler');
const isUserActive = require('../middlewares/isUserActive');
const isUserAuthenticated = require('../middlewares/isUserAuthenticated');
const limiter = require('../middlewares/loginRateLimiter');

userRouter
    .post('/login', limiter,login) 
    .post('/signup', signup)
    .post('/refresh', refreshAccessToken)
    .get('/profile', isUserAuthenticated, isUserActive, viewProfile);

module.exports = userRouter;
