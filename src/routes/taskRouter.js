const taskRouter = require('express').Router();
const {
    createTask,
    updateTaskById,
    getTasks,
    deleteTaskById,
    seeDeletedTasks,
    wipeDeletedTasks
} = require('../handlers/taskHandler');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isUserActive = require('../middlewares/isUserActive');

taskRouter
    .post('/create', isAuthenticated, isUserActive, createTask)
    .put('/update/:id', isAuthenticated, isUserActive, updateTaskById)
    .get('/all', isAuthenticated, isUserActive, getTasks)
    .delete('/delete/:id', isAuthenticated, isUserActive, deleteTaskById)
    .get('/deleted', isAuthenticated, isUserActive, seeDeletedTasks)
    .delete('/wipe', isAuthenticated, isUserActive, wipeDeletedTasks);

module.exports = taskRouter;

