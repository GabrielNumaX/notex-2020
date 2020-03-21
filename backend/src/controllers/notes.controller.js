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


notesController.postNote = async (req, res) => {

    const {note, author, date} = req.body;
     
    const newNote = new notesModel({
        note, 
        author,
        date
    });

    await newNote.save();

    res.json({
        note: 'Note created'
    });
};

notesController.putNote = async (req, res) => {

    const id = req.params.id;

    const {note, author, date} = req.body;

    await notesModel.findByIdAndUpdate({_id: id}, {
        note,
        author,
        date
    });

    res.json({
        note,
        author,
        date
    });
};

notesController.deleteNote = async (req, res) => {

    const id = req.params.id;

    await notesModel.findByIdAndDelete(id);

    res.json({
        notes: 'Note Deleted'
    });

};

module.exports = notesController;