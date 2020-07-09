const { Router} = require('express');
const router = Router();

const {
    getNotes, 
    getNote,
    postNote, 
    putNote, 
    deleteNote
} = require('../controllers/notes.controller');

const jwtAuth = require('../middleware/jwtAuth');


router.get('/', jwtAuth, getNotes);
router.post('/', jwtAuth, postNote);

//validar el token de user para acceder a las notas por :id
router.get('/:id', jwtAuth, getNote);
router.put('/:id', jwtAuth, putNote);
router.delete('/:id', jwtAuth, deleteNote);


module.exports = router;