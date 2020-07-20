require('express-async-errors');
const error = require('./middleware/error');
const express = require('express');
const cors = require('cors');
const appEx = express();

appEx.set('port', process.env.PORT || 3030);

//MIDDLEWARE
appEx.use(cors({
    // allowedHeaders: ['Content-Type', 'Authorization', 'x-notex-token'],
    exposedHeaders: ['x-notex-token'],
    // preflightContinue: true,
    // credentials: true
}));
appEx.use(express.json());

//ROUTES
appEx.use('/api/user', require('./routes/user.route'));
appEx.use('/api/notes', require('./routes/notes.route'));

//ERROR HANDLING
appEx.use(error);



module.exports = appEx;