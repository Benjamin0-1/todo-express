const express = require('express');
const app = express();
require('dotenv').config();
const port = 3001 || process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const loadDb = require('./utils/loadDb');
const indexRouter = require('./routes/index');
const sequelize = require('./db');

app.use(cors(
    {
        origin: 'http://localhost:5173',
    }
));

app.use(bodyParser.json());

app.use('/api', indexRouter);


sequelize.sync({force: false}).then(async () => {
    await loadDb()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


module.exports = app;
