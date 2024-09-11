const express = require('express');
const app = express();
require('dotenv').config();
const port = 3001 || process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const loadDb = require('./utils/loadDb');

app.use(cors(
    {
        origin: 'http://localhost:5173',
    }
));

app.use(bodyParser.json());


app.listen(port, async () => {
    await loadDb(); 
    console.log(`Server is running on port ${port}`);
});


module.exports = app;
