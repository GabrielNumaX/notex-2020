const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userModel = require('../models/user.model');

passport.use(new LocalStrategy({

  usernameField: 'user',
  passwordField: 'password',
  passReqToCallback: true

}, async (req, userAuth, done) => {

    console.log(userAuth);

  const user = await userModel.findOne({user: userAuth});

  if(!user){

  	//error, user,  mensaje
    return done(null, false, {message: 'User not found'});
  } else {

    //ACA VALIDA EL PASS con la function del model

    const user = req.body.user;
    const password = req.body.password;

    console.log('USER',user);
    console.log('PASS', password);


    const match = await userModel.getAuthenticated(user, password, function(err, user, reason) {

        console.log('inside funct');
        if(err) {

            console.log('inside funct err');
            throw err;
        }

        // login was successful if we have a user
        if(user) {

            // return;
            console.log('inside funct IF');
            return (true);
            // return({login: true});
        }

        // otherwise we can determine why we failed
        const reasons = userModel.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
                // res.json({login: 'Login Failed'});
                // res.json({login: false});
                // return done(null, false, {login: false});
                return(false);
                break;
            case reasons.PASSWORD_INCORRECT:
                // res.json({login: 'Login Failed'});
                // res.json({login: false});
                // console.log('wrong password');
                // return done(null, false, {login: false});
                return(false);
                break;
            case reasons.MAX_ATTEMPTS:
                // res.json({login: 'Login Failed'});
                // res.json({login: false});
                // return done(null, false, {login: false});
                return(false);
                break;
        }
    });
 
    if(match){
  
      return(null, user)
    } else {

      return done(null, false, {message: 'Password incorrect'})
    } 
  }
}))

passport.serializeUser((user, done) => {

    done(null, user.id);
  })
   
//   ACA BUSCA POR id y genera un user
  passport.deserializeUser((id, done) => {
  
    userModel.findById(id, (err, user) => {
  
      done(err, user);
    })
  })