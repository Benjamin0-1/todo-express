const User = require('./User');
const Admin = require('./Admin');
const Task = require('./Task');
const LoginHistory = require('./LoginHistory');
const AuditLog = require('./AuditLog');
const DeletedTask = require('./DeletedTask');
const sequelize = require('../db');

User.hasOne(Admin, { foreignKey: 'userId' });
Admin.belongsTo(User, { foreignKey: 'userId' }); 

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(LoginHistory, { foreignKey: 'userId' });
LoginHistory.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(AuditLog, { foreignKey: 'userId' });
AuditLog.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(DeletedTask, { foreignKey: 'userId' });
DeletedTask.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Admin,
    Task,
    LoginHistory,
    AuditLog,
    DeletedTask,
    sequelize
};

