const userModel = require('../models/user.model');
const notesModel = require('../models/notes.model');

const userController = {};

userController.getUsers = async (req, res) => {

    const users = await userModel.find();

    res.json(users)
}

userController.postUserValidate = async (req, res) => {
        
    const {user, password} = req.body;

    // const response = await userModel.find(req.body);

    // res.json(response);

    // attempt to authenticate user
    await userModel.getAuthenticated(user, password, function(err, user, reason) {
        if(err) {
            throw err;
        }

        // login was successful if we have a user
        if(user) {

            //handle login
            // res.json({login: true});
            res.json({login: true});

            return;
        }

        //THIS IS FROM THE MODEL METHODS
        // const reasons = userSchema.statics.failedLogin = {
        //     NOT_FOUND: 0,
        //     PASSWORD_INCORRECT: 1,
        //     MAX_ATTEMPTS: 2
        // };
        

        // otherwise we can determine why we failed
        const reasons = userModel.failedLogin;
        // console.log(reasons);
        //aca estaba es ERROR
        switch (reason) {
            case reasons.NOT_FOUND:
                // res.json({login: 'Login Failed'});
                res.json({login: false});
                break;
            case reasons.PASSWORD_INCORRECT:
                // res.json({login: 'Login Failed'});
                res.json({login: false});
                // console.log('wrong password');
                break;
            case reasons.MAX_ATTEMPTS:
                // res.json({login: 'Login Failed'});
                res.json({login: false});
                break;
        }
    });
};

userController.getUser = async (req, res) => {

    const id = req.params.id;

    const user = await userModel
                            .findById(id)
                            .populate('notes');

    res.json(user);
}


userController.postUser = async (req, res) => {

    const {user, email, password} = req.body;
     
    const newUser = new userModel ({
        user,
        email,
        password
    });

    await newUser.save();

    res.json({
        user: 'User created'
    });
};

userController.putUser = async (req, res) => {

    const id = req.params.id;

    const {user, email} = req.body;
    
    await userModel.findByIdAndUpdate({_id: id}, {
        user,
        email
    });

    res.json({
        user,
        email
    });
};

userController.deleteUser = async (req, res) => {

    const id = req.params.id;

    await userModel.findByIdAndDelete(id);

    res.json({
        user: 'User Deleted'
    });

};

//this gives and EMBEDED REFERENCE ON USERS

userController.postUserNote = async (req, res) => {

    const id = req.params.id;

    //creates new note
    const newNote = new notesModel(req.body);
    //get user
    const user = await userModel.findById(id);
    //asign reference relationship
    newNote.author = user;
    //save note
    await newNote.save();
    //add note to user
    user.notes.push(newNote._id);
    //save user
    await user.save();

    res.json(newNote);
    // res.send('post user note');
}

userController.getUserNotes = async (req, res) => {

    const id = req.params.id;

    const user = await userModel.findById(id)
                                .populate('notes');

    res.json(user.notes);

}

// const addTutorialToCategory = function(tutorialId, categoryId) {
//     return db.Tutorial.findByIdAndUpdate(
//       tutorialId,
//       { category: categoryId },
//       { new: true, useFindAndModify: false }
//     );
//   };


// userController.addNoteToUser = async (req, res) => {

//     // const userId = req.params.id;

//     // // creates new note
//     // const noteToSave = new notesModel(req.body);

//     // await noteToSave.save();

//     // const noteId = noteToSave._id;

//     // const newNote = await notesModel.findByIdAndUpdate(noteId, {author: userId}, {new: true});

//     // res.json(newNote);

//     res.json({note: 'add note to user'});
// }

module.exports = userController;