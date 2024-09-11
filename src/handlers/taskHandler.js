const Task = require ('../models/Task');
const DeletedTask = require ('../models/DeletedTask');
const AuditLog = require ('../models/AuditLog');
const {Op} = require('sequelize');

const createTask = async (req, res) => {
    const {tittle, description} = req.body;
    const userId = req.user.id;

    if (!tittle || !description) {
        return res.status(400).json({message: 'Missing required information'});
    };

    let tittle_to_find = tittle.trim().toLowerCase(); 


    try {
        
        
        const task = await Task.findOne({where: {tittle: tittle_to_find, userId}});
        if (task) {
            return res.status(400).json({message: 'Task already exists'});
        };

        await Task.create({tittle, description, userId});

        await AuditLog.create({action: 'Task created', userId, ipAddress: req.ip});

        return res.status(201).json({message: 'Task created'});

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
};

const updateTaskById = async (req, res) => {
    const {id} = req.params;
    const {tittle, description, isCompleted} = req.body;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({message: 'Missing required information'});
    };

    try {

        const task = await Task.findOne({where: {id, userId}});
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        };

        const updatedFields = {};
        if (task.tittle === tittle) {
            return res.status(400).json({message: 'Task already exists with this tittle'});
        };

        if (tittle) {
            updatedFields.tittle = tittle;
        }
        if (description) {
            updatedFields.description = description;
        }
        if (isCompleted !== undefined) {
            updatedFields.isCompleted = isCompleted;
        }

        await Task.update(updatedFields, {where: {id, userId}});
        return res.status(200).json({message: 'Task updated'});

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
};

const getTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        const tasks = await Task.findAll({where: {userId}});

        if (tasks.length === 0) {
            return res.status(404).json({message: 'No tasks found'});
        };

        return res.status(200).json({tasks});

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
};


const deleteTaskById = async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id;

    if (!id) {
        return res.status(400).json({message: 'Missing required information'});
    };

    try {
        const task = await Task.findOne({where: {id, userId}});
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        };

        await DeletedTask.create({tittle: task.tittle, description: task.description, userId});

        await Task.destroy({where: {id, userId}});

        await AuditLog.create({action: 'Task deleted', userId, ipAddress: req.ip});

        return res.status(200).json({message: 'Task deleted'});

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
};

const seeDeletedTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        
        const deletedTasks = await DeletedTask.findAll({where: {userId}}); 
        if (deletedTasks.length === 0) {
            return res.status(404).json({message: 'No deleted tasks found'});
        };

        return res.status(200).json({deletedTasks});

    } catch (error) {
     return res.status(500).json({message: `Internal server error: ${error}`});   
    }
};

const wipeDeletedTasks = async (req, res) => {
    const userId = req.user.id;

    try {
        
        const deletedTasks = await DeletedTask.findAll({where: {userId}});
        if (deletedTasks.length === 0) {
            return res.status(404).json({message: 'No deleted tasks found'});
        };

        await DeletedTask.destroy({where: {userId}});

        await AuditLog.create({action: 'Deleted tasks wiped', userId, ipAddress: req.ip});
        return res.status(200).json({message: 'Deleted tasks wiped'});

    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
        
    }
};


module.exports = {
    createTask,
    updateTaskById,
    getTasks,
    deleteTaskById,
    seeDeletedTasks,
    wipeDeletedTasks
};
