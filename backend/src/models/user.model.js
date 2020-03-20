const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    user: {
        type: String,
        trim: true, 
        required:true,
    },
    email: { type: String, required: true }

}, {timestamps: true});

module.exports = model('userModel', userSchema);