const express = require('express');
const cors = require('cors');
const appEx = express();

appEx.set('port', process.env.PORT || 3030);


//MIDDLEWARE

appEx.use(cors());
appEx.use(express.json());


//ROUTES
appEx.use('/api/user', require('./routes/userRoute'));
appEx.use('/api/notes', require('./routes/notesRoute'));

module.exports = appEx;