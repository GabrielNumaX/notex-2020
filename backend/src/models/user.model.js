const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');



const userSchema = new Schema({
    user: {
        type: String,
        trim: true, 
        required:true,
        unique: true,
    },
    password: {type: String,
                required: true},
    email: { type: String, required: true },
    notes: [
        { type: Schema.Types.ObjectId, ref: 'Notes' }
      ],
    

}, {timestamps: true});

module.exports = model('Users', userSchema);