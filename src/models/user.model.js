// const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000; //dos horas-> 1seg x 60 x 60min x 2hs
//two hours LOCK_TIME


const userSchema = new Schema({
    user: {
        type: String,
        trim: true, 
        required:true,
        unique: true,
    },
    password: {type: String,
                required: true},
    email: { 
        type: String, 
        required: true,
        unique: true,
    },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number },
    notes: [
        { type: Schema.Types.ObjectId, ref: 'Notes' }
      ],

}, {timestamps: true});

userSchema.virtual('isLocked').get(function(){

    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.pre('save', function(next) {

    const user = this;

    // only hash the password if it has been modified (or is new)
    if(!user.isModified('password')){
        return next();
    }

    // generate a SALT
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){

        if(err) {
            return next(err);
        }

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if(err) {
                return next(err);
            }

            user.password = hash;

            next();
        });      
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
}

userSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if(this.lockUntil && this.lockUntil < Date.now()){

        //ALL .update where changed to avoid DEPRECATION
        // return this.update({
        return this.updateOne({
            $set: {loginAttempts: 1},
            $unset: {lockUntil: 1}
        }, cb);
    }

    // otherwise we're incrementing
    const updates = {$inc: {loginAttempts: 1}};
    
    // lock the account if we've reached max attempts and it's not locked already
    if(this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = {lockUntil: Date.now() + LOCK_TIME};
    }

    // return this.update(updates, cb);
    return this.updateOne(updates, cb);
}

const reasons = userSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};


//se cambio user a email para q se logguee con el email
userSchema.statics.getAuthenticated = function(email, password, cb) {

    this.findOne({email: email}, function(err, user) {

        if(err) {
            return cb(err);
        }

        //make sure the user exists
        if(!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }

        // check if the account is currently locked
        if(user.isLocked){
            // just increment login attempts if account is already locked
            return user.incLoginAttempts(function (err) {

                if(err) {
                    return cb(err);
                }
                return cb(null, null, reasons.MAX_ATTEMPTS);
            })
        }

        // test for a matching password
        user.comparePassword(password, function(err, isMatch) {
            if(err){
                return cb(err);
            }

            // check if the password was a match
            if(isMatch) {
                // if there's no lock or failed attempts, just return the user
                if(!user.loginAttempts && !user.lockUntil) {
                    return cb(null, user);
                }

                // reset attempts and lock info
                let updates = {
                    $set: {loginAttempts: 0},
                    $unset: {lockUntil: 1}
                };

                // return user.update(updates, function(err) {
                return user.updateOne(updates, function(err) {    
                    if(err) {
                        return cb(err);
                    }
                    return cb(null, user);
                });
            }
            // password is incorrect, so increment login attempts before responding

            user.incLoginAttempts(function(err) {

                if(err) {
                    return cb(err);
                }

                return cb(null, null, reasons.PASSWORD_INCORRECT);
            });
        });     
    });
};



//IMPORTANTE ESTO DEBE SER LLAMADO DE LA INSTANCIA DE user
//NO DEL UserModel

//esto es de 10.9 de mosh JWT
userSchema.methods.generateAuthToken = function() {

    const token = jwt.sign({_id: this._id}, process.env.JWT_KEY);

    return token;
  }

module.exports = model('Users', userSchema);