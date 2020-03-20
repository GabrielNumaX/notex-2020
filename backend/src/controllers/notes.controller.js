const notesModel = require('../models/notes.model');

const notesController = {};

notesController.getNotes = async ((req, res) => {

    const notes = await notesModel.find();

    res.json(notes)
    });

notesController.getNote = async ((req, res) => {

    const id = req.params.id;

    const note = await notesModel.findById(id);

    res.json(note);
})


notesController.postNotes = async ((req, res) => {

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
});

notesController.putNotes = async ((req, res) => {

    const id = req.params.id;

    const {note, author, date} = req.body;
     
    // const putNote = {
    //     note, 
    //     author,
    //     date
    // };

    await putNote.findOneAndUpdate({id}, {
        note,
        author,
        date
    });

    res.json({
        notes: 'Note Updated'
    });
});

notesController.deleteNotes = async ((req, res) => {

    const id = req.params.id;

    await notesModel.findByIdAndDelete(id);

    res.json({
        notes: 'Note Deleted'
    });

});

module.exports = notesController;