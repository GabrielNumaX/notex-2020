// require('./passport/passport');

require('./passport/passportAsync');
const express = require('express');
const cors = require('cors');
const appEx = express();
const passport = require('passport');


appEx.set('port', process.env.PORT || 3030);


//MIDDLEWARE

appEx.use(cors());
appEx.use(express.json());
appEx.use(passport.initialize());
appEx.use(passport.session());


//ROUTES
appEx.use('/api/user', require('./routes/userRoute'));
appEx.use('/api/notes', require('./routes/notesRoute'));

module.exports = appEx;