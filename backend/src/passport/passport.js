const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const LocalStrategy = require('passport-local');
const userModel = require('../models/user.model');


//a esto le pone por defecto el nombre 'local'
//que es el que usa en las rutas

// passport.use(new LocalStrategy({

//   usernameField: 'email'

// }, 

//   async (email, password, done) => {

//     console.log(LocalStrategy.usernameField);


//     const user = await userModel.findOne({email: email});

    

//     if(!user){

//         //error, user,  mensaje
//         return done(null, false, {message: 'user not found'});
//     } else {

//         //ACA VALIDA EL PASS con la function matchPassword
//         //YO USO LA function para comprobar la contraseña encriptada
//         // const match = await user.matchPassword(password);

//         await userModel.getAuthenticated(email, password, function(err, email, reason) {
//             if(err) {
//                 throw err;
//             }

//             // login was successful if we have a user
//             if(email) {

//                 const userData = userModel.findOne(email);

//                 //it must be a better way to do this
//                 // res.json({
//                 //     _id: userData._conditions._id,
//                 //     email: userData._conditions.email,
//                 //     user: userData._conditions.user,
//                 //     login: true
//                 // });
//                 // console.log(userData._conditions.user);

//                 return({
//                     _id: userData._conditions._id,
//                     email: userData._conditions.email,
//                     user: userData._conditions.user,
//                     login: true
//                 });
//             }

//             //THIS IS FROM THE MODEL METHODS
//             // const reasons = userSchema.statics.failedLogin = {
//             //     NOT_FOUND: 0,
//             //     PASSWORD_INCORRECT: 1,
//             //     MAX_ATTEMPTS: 2
//             // };
            

//             // otherwise we can determine why we failed
//             const reasons = userModel.failedLogin;
//             //aca estaba es ERROR
//             switch (reason) {
//                 case reasons.NOT_FOUND:
//                     // res.json({login: 'Login Failed'});
//                     // res.json({login: false});
//                     return({login: false});
//                     break;
//                 case reasons.PASSWORD_INCORRECT:
//                     // res.json({login: 'Login Failed'});
//                     // res.json({login: false});
//                     return({login: false});
//                     // console.log('wrong password');
//                     break;
//                 case reasons.MAX_ATTEMPTS:
//                     // res.json({login: 'Login Failed'});
//                     // res.json({login: false});
//                     return({login: false});
//                     break;
//             }
//         });
//     };
// }))

passport.use(new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password'

    },
    async function(user, password, done) {

    //     console.log(email, password);

    // console.log(user);

    //   await userModel.findOne({ email: email }, function (err, user) {

    //     // console.log('validation')
    //     if (err) { 
    //         return done(err); 
    //     }
    //     if (!user) { 
    //         return done(null, false); 
    //     }
    //     // if (!user.verifyPassword(password)) { 
    //     //     return done(null, false); 
    //     // }
    //     if(user) {
    //         // console.log('inside if user');
    //         // console.log(user);
            
    //         const {email, password} = user;


            // attempt to authenticate user  
            
        const userVerify = user;
        const passwordVerify = password

        await userModel.getAuthenticated(userVerify, passwordVerify, function(err, user, reason) {

            if(err) {
                throw err;
            }

            // console.log(userVerify, 'email');
            // console.log(passwordVerify, 'pass');
            // console.log(user, 'user');
            // login was successful if we have a user
            if(user) {

                console.log('if email auth')

                // console.log(user);
                const userData = userModel.findOne({user: userVerify});

                // it must be a better way to do this
                // res.json({
                //     _id: userData._conditions._id,
                //     email: userData._conditions.email,
                //     user: userData._conditions.user,
                //     login: true
                // });
                // console.log(userData._conditions.user);

                // console.log(userData);

                // console.log(email);

                return done(null, userData, {login: true});
            }

            // otherwise we can determine why we failed
            const reasons = userModel.failedLogin;
            //aca estaba es ERROR
            switch (reason) {
                case reasons.NOT_FOUND:
                    // res.json({login: 'Login Failed'});
                    // res.json({login: false});
                    return done(null, false, {login: false});
                    break;
                case reasons.PASSWORD_INCORRECT:
                    // res.json({login: 'Login Failed'});
                    // res.json({login: false});
                    // console.log('wrong password');
                    return done(null, false, {login: false});
                    break;
                case reasons.MAX_ATTEMPTS:
                    // res.json({login: 'Login Failed'});
                    // res.json({login: false});
                    return done(null, false, {login: false});
                    break;
            }
        });
        // }

        // console.log('user out if')
        // return done(null, user);

    //   });
    })
)

// );
// console.log(user, 'out func');
// ESTO AUTENTICA

// ahora guarda la session con el id de user

passport.serializeUser((user, done) => {
 
    console.log('SERIALIZE');
    // console.log(user);
  done(null, user._id);
})
 
// ACA BUSCA POR id y genera un user

passport.deserializeUser((id, done) => {

  User.findById(id, (err, user) => {

    done(err, user);
  })
})

module.exports = passport;