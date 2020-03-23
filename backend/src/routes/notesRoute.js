const { Router} = require('express');
const router = Router();

const {
    getNotes, 
    getNote, 
    putNote, 
    deleteNote
} = require('../controllers/notes.controller');


router.route('/')
    .get(getNotes)
    // .post(postNote);
    
router.route('/:id')
    .get(getNote)
    .put(putNote)
    .delete(deleteNote);

module.exports = router;