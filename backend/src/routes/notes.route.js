const { Router} = require('express');
const router = Router();

const {
    getNotes, 
    getNote,
    postNote, 
    putNote, 
    deleteNote
} = require('../controllers/notes.controller');

const jwtAuth = require('../jwt/jwtAuth');


router.get('/', getNotes)
// router.route('/')
//     .get(getNotes)
    // .post(postNote);

    

//validar el token de user para acceder a las notas por :id
router.get('/:id', jwtAuth, getNote);
router.put('/:id', jwtAuth, putNote);

router.post('/', postNote);

// router.route('/:id')
//     .get(getNote)
//     .put(putNote)
//     .delete(deleteNote);

module.exports = router;