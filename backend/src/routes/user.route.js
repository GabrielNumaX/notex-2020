const { Router} = require('express');
const router = Router();
const jwtAuth = require('../jwt/jwtAuth');

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

router.get('/', jwtAuth, getUsers);

router.post('/signin', postUserValidate)
    // .get(getUsers)
    // .post(postUserValidate)
    // .post(postUser);

router.post('/signup', postUser)
    // .post(postUser);


//IMPORTANTE
//con el token NO es necesario para el :id por url

// router.route('/:id')
//     .get(getUser)
//     .put(putUser)
//     .delete(deleteUser);

router.get('/', jwtAuth, getUser);
router.put('/', jwtAuth, putUser);
router.delete('/', jwtAuth, deleteUser);


router.post('/note', jwtAuth, postUserNote);
router.get('/note', jwtAuth, getUserNotes);

// router.route('/note/:id')
//     .post(postUserNote)
//     .get(getUserNotes);


module.exports = router;