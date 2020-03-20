const express = require('express');
const cors = require('cors');
const appEx = express();

appEx.set('port', process.env.PORT || 3000)

//MIDDLEWARE
appEx.use(cors());
appEx.use(express.json());

//ROUTES
appEx.use('/api/user', require('./routes/userRoute'));

module.exports = appEx;