const express = require('express');
const bodyParser = require('body-parser');
const questionsRoute = require('./routes/questions');
require('./config/database');

const app = express();

app.use(bodyParser.json());

app.use('/api/questions', questionsRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
