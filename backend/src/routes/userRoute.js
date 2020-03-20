const { Router} = require('express');
const router = Router();

const {
    getUsers, 
    postUser, 
    getUser, 
    putUser, 
    deleteUser
} = require('../controllers/user.controller');


router.route('/')
    .get(getUsers)
    // .get(userController.getUser)
    .post(postUser);
    // .post((req ,res) => {
    //     res.json({
    //         user: 'User posted'
    //     })
    // })
    
    // .get((req, res) => {
    //     res.send('User route');
    // });

    
router.route('/:id')
    .get(getUser)
    .put(putUser)
    .delete(deleteUser);

module.exports = router;