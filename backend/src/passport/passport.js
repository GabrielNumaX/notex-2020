const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user.model');

passport.use(new LocalStrategy(
    function(user, email, password, done) {
      User.findOne({ user: user }, function (err, user) {
        if(err) { 
            return done(err); 
        }
        if(!user) {
             return done(null, false);
            //  aca iria para veificar por email
            // misma logica con if-if 
        }
        if(!user.verifyPassword(password)) {
             return done(null, false); 
        }

        return done(null, user);
      });
    }
  ));


  passport.serializeUser((user, done) => {

    done(null, user._id);
  })
   
//   ACA BUSCA POR id y genera un user
  passport.deserializeUser((id, done) => {
  
    User.findById(id, (err, user) => {
  
      done(err, user);
    })
  })