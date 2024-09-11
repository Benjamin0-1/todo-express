const taskRouter = require('express').Router();
const {
    createTask,
    updateTaskById,
    getTasks,
    deleteTaskById,
    seeDeletedTasks,
    wipeDeletedTasks
} = require('../handlers/taskHandler');

const isUserAuthenticated = require('../middlewares/isUserAuthenticated');
const isUserActive = require('../middlewares/isUserActive');

taskRouter
    .post('/create', isUserAuthenticated, isUserActive, createTask)
    .put('/update/:id', isUserAuthenticated, isUserActive, updateTaskById)
    .get('/all', isUserAuthenticated, isUserActive, getTasks)
    .delete('/delete/:id', isUserAuthenticated, isUserActive, deleteTaskById)
    .get('/deleted', isUserAuthenticated, isUserActive, seeDeletedTasks)
    .delete('/wipe', isUserAuthenticated, isUserActive, wipeDeletedTasks);

module.exports = taskRouter;

