const User = require('../models/User');
const Admin = require('../models/Admin');

const defaultAdminUser = {
    email: 'admin@gmail.com',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'Admin',
    emailConfirmed: true,
    deleted_at: null
};

const loadDb = async () => {
   try {
    
        const admin = await User.findOne({where: {email: defaultAdminUser.email}});
        if (!admin) {
            await User.create(defaultAdminUser);
            await Admin.create({user_id: 1});
        };

        console.log('Database loaded successfully');

   } catch (error) {
       console.log('Error loading database');
    
   };
};


module.exports = loadDb;