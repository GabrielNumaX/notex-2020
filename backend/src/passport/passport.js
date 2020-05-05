const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user.model');

passport.use(new LocalStrategy(
    {
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, userAuth, email, password, done) {

        userModel.findOne({ user: userAuth }, function (err, userAuth) {
            if(err) { 
                return done(err); 
            }
            if(!userAuth) {
                return done(null, false);
                //  aca iria para verificar por email
                // misma logica con if-if 
            }
            // if(!user.verifyPassword(password)) {
            //      return done(null, false); 
            // }
            if(userAuth) {
                // return done(null, false); 

                // console.log('USER_AUTH',userAuth);

                const user = userAuth.user; 

                const password = req.body.password;

                console.log('USER',user);
                console.log('PASS', password);

                userModel.getAuthenticated(user, password, function(err, user, reason) {

                    console.log('inside funct');
                    if(err) {

                        console.log('inside funct err');
                        throw err;
                    }
            
                    // login was successful if we have a user
                    if(user) {
            
                        // return;
                        console.log('inside funct IF');
                        return (user, {login: true});
                        // return({login: true});
                    }
            
                    // otherwise we can determine why we failed
                    const reasons = userModel.failedLogin;
                    switch (reason) {
                        case reasons.NOT_FOUND:
                            // res.json({login: 'Login Failed'});
                            // res.json({login: false});
                            // return done(null, false, {login: false});
                            return({login: false});
                            break;
                        case reasons.PASSWORD_INCORRECT:
                            // res.json({login: 'Login Failed'});
                            // res.json({login: false});
                            // console.log('wrong password');
                            // return done(null, false, {login: false});
                            return({login: false});
                            break;
                        case reasons.MAX_ATTEMPTS:
                            // res.json({login: 'Login Failed'});
                            // res.json({login: false});
                            // return done(null, false, {login: false});
                            return({login: false});
                            break;
                    }
                });

                // return done(null, userAuth)
            }

            // return done(null, userAuth)
        });

        return done(null, userAuth)
    }
  ));


  passport.serializeUser((user, done) => {

    done(null, user._id);
  })
   
//   ACA BUSCA POR id y genera un user
  passport.deserializeUser((id, done) => {
  
    userModel.findById(id, (err, user) => {
  
      done(err, user);
    })
  })