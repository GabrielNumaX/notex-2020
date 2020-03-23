const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const notesSchema = new Schema({
    note: {type: String, trim: true},
    // author: {type: String, required: true},
    author: { 
      type: Schema.Types.ObjectId, 
      ref: 'Users' 
    },
    date: {
        type: Date,
        default: Date.now
      }  
}, {timestamps: true});

//Parent Referencing 
//User->parent
//Notes->child
//1 user : N notes

//addNoteToUser

module.exports = model('Notes', notesSchema);