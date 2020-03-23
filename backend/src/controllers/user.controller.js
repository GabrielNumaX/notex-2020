const userModel = require('../models/user.model');
const notesModel = require('../models/notes.model');

const userController = {};

userController.getUsers = async (req, res) => {

    const users = await userModel
                            .find()
                            .populate('notes');

    res.json(users)
    // res.json({user: 'user exists from controller'});
}

userController.getUser = async (req, res) => {

    const id = req.params.id;

    const user = await userModel
                            .findById(id)
                            .populate('notes');

    res.json(user);
}


userController.postUser = async (req, res) => {

    const {user, email} = req.body;
     
    const newUser = new userModel ({
        user,
        email
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