const { Router} = require('express');
const router = Router();

const {
    getUsers, 
    postUser, 
    getUser, 
    putUser, 
    deleteUser,
    postUserNote,
    getUserNotes,
} = require('../controllers/user.controller');


router.route('/')
    .get(getUsers)
    .post(postUser);

router.route('/:id')
    .get(getUser)
    .put(putUser)
    .delete(deleteUser);

router.route('/:id/notes')
    .post(postUserNote)
    .get(getUserNotes);
    // .post(addNoteToUser);


module.exports = router;