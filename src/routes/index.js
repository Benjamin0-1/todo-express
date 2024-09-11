const router = require('express').Router();
const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter');
const taskRouter = require('./taskRouter');

router
    .use('/user', userRouter)
    .use('/admin', adminRouter)
    .use('/task', taskRouter);

module.exports = router;
