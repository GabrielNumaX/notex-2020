require('express-async-errors');
const error = require('./middleware/error');
const express = require('express');
const cors = require('cors');
const appEx = express();
const path = require('path')

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

//checks if it's running in heroku

if(process.env.NODE_ENV === 'production') {

    //serves react app  
      appEx.use(express.static('./frontend/build'));
    
    //   appEx.get('*', (req, res) => {
    
    //      res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')) //relative path
    //   })
    
    }

//ERROR HANDLING
appEx.use(error);



module.exports = appEx;