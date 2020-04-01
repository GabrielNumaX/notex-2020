const { Router} = require('express');
const router = Router();

const {
    getUsers,
    getUser, 
    postUser, 
    postUserValidate, 
    putUser, 
    deleteUser,
    postUserNote,
    getUserNotes,
} = require('../controllers/user.controller');


router.route('/')
    .get(getUsers)
    .post(postUserValidate)
    // .post(postUser);

router.route('/create')
    .post(postUser);

router.route('/:id')
    .get(getUser)
    .put(putUser)
    .delete(deleteUser);

// router.route('/:id/notes')
router.route('/note/:id')
    .post(postUserNote)
    .get(getUserNotes);
    // .post(addNoteToUser);


module.exports = router;