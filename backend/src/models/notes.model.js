const { Schema, model } = require('mongoose');

const notesSchema = new Schema({
    note: {type: String, trim: true},
    author: {type: String, required: true},
    date: {
        type: Date,
        default: Date.now
      }  
}, {timestamps: true});

module.exports = model('noteModel', notesSchema);