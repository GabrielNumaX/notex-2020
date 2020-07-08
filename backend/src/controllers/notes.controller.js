const notesModel = require('../models/notes.model');
const userModel = require('../models/user.model');
const { Mongoose, Types } = require('mongoose');

const notesController = {};

notesController.getNotes = async (req, res) => {

    const notes = await notesModel
                            .find()
                            .populate('author');

    res.json(notes)
};

//abajo voy esta la logica inversa:
//busca el user por id del token
//busca la nota por id
//y hace un populate de la note
notesController.getNote = async (req, res) => {

    const idUser = req.user._id;
    const idNote = req.params.id;

    // console.log(idNote)

    // const objId = Types.ObjectId(idNote);

    // console.log(objId);

    // //esto intentaba buscar por user y despues
    // //filtar la note por id
    // //pero lo hice como esta abajo
    // //ya q si no tiene token no puede buscar la note

    // // console.log(Types.ObjectId)

    // const user = await userModel
    //                     .findById(idUser)
    //                     // .populate('notes')
    //                     // .select('notes')
    //                     // .find({'notes': {$in: Types.ObjectId(idNote)}})
    //                     .find({'notes': {$in: objId}})

    //                     // .select({notes: idNote})

    //                     // .select('notes')
    //                     // // .populate('notes')
    //                     // .find({'notes': [idNote]})
    //                     .exec(function (err, res)  {
    //                         if(err) {
    //                             console.log(err)
    //                         }
    //                         else {

    //                             console.log(res);
    //                         }
    //                     })

    // res.json(user)

    //esto es lo original

    const note = await notesModel
                        .find()

    res.json(note);
                        
}


//esto es viejo
// notesController.getNote = async (req, res) => {

//     const id = req.params.id;

//     const note = await notesModel
//                         .findById(id)
//                         .populate('author');


//     res.json(note);
// };

//ADD NOTE TO USER
//ADD TUTO TO CATEG

// notesController.postNote = async (req, res) => {

//     const userId
//     const noteId;

//     const newNote = await notesModel.findByIdAndUpdate()
// }

//ESTE SE HACE POR ID DE USER

notesController.postNote = async (req, res) => {

    // const {note, author, date} = req.body;
    // const author = req.params._id

    const {note, author} = req.body;
     
    const newNote = new notesModel({
        note,
        author,
    });

    await newNote.save();

    // res.json({
    //     note: 'Note created'
    // });

    res.json(newNote)
};

notesController.putNote = async (req, res) => {

    const id = req.params.id;

    const {note} = req.body;

    const putNote = await notesModel.findByIdAndUpdate({_id: id}, {
        note,
    }, {new: true});

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