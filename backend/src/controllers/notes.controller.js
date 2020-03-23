const notesModel = require('../models/notes.model');

const notesController = {};

notesController.getNotes = async (req, res) => {

    const notes = await notesModel.find();

    res.json(notes)
};

notesController.getNote = async (req, res) => {

    const id = req.params.id;

    const note = await notesModel.findById(id);

    res.json(note);
};

//ADD NOTE TO USER
//ADD TUTO TO CATEG

// notesController.postNote = async (req, res) => {

//     const userId
//     const noteId;

//     const newNote = await notesModel.findByIdAndUpdate()
// }

//ESTE SE HACE POR ID DE USER

// notesController.postNote = async (req, res) => {

//     const {note, author, date} = req.body;
     
//     const newNote = new notesModel({
//         note, 
//         author,
//         date
//     });

//     await newNote.save();

//     res.json({
//         note: 'Note created'
//     });
// };

notesController.putNote = async (req, res) => {

    const id = req.params.id;

    const {note} = req.body;

    const putNote = await notesModel.findByIdAndUpdate({_id: id}, {
        note,
    });

    res.json(putNote);
};

notesController.deleteNote = async (req, res) => {

    const id = req.params.id;

    await notesModel.findByIdAndDelete(id);

    res.json({
        notes: 'Note Deleted'
    });

};

module.exports = notesController;