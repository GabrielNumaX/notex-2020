const notesModel = require('../models/notes.model');
const userModel = require('../models/user.model');

const notesController = {};

notesController.getNotes = async (req, res) => {

    const idUser = req.user._id;

    const userNotes = await userModel
                        .findById(idUser)
                        .populate('notes')
                        .select('notes');

    res.json(userNotes)
};

notesController.getNote = async (req, res) => {

    const idNote = req.params.id;

    const note = await notesModel
                        .findById(idNote)

    res.json(note);
                        
}

notesController.postNote = async (req, res) => {

    //id from token
    const {_id} = req.user;
    //new note
    const newNote = new notesModel(req.body);
    //user to note relation
    const user = await userModel.findById(_id);

    newNote.author = user;

    await newNote.save();
    //note to user relation
    user.notes.push(newNote);

    await user.save();
    //sends new note
    res.json({
        _id: newNote._id,
        note: newNote.note,
        date: newNote.date,
        author_id: newNote.author._id,
        author: newNote.author.user
    });

}

notesController.putNote = async (req, res) => {

    const idNote = req.params.id;

    const {note} = req.body;

    const putNote = await notesModel.findByIdAndUpdate({_id: idNote}, {
        note,
    }, {new: true});

    res.json(putNote);
};

notesController.deleteNote = async (req, res) => {

    const idNote = req.params.id;

    await notesModel.findByIdAndDelete(idNote);

    res.json({
        notes: 'Note Deleted'
    });

};

module.exports = notesController;