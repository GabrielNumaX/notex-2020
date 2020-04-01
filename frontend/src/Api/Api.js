//ESTO NO SIRVE XQ TOMA EL PORT DE REACT -> :3000

// const protocol = window.location.protocol;
// const URLmaster = window.location.host;

// const comentariosAjax = `${protocol}//${URLmaster}/Comentarios/ajax_listado`;

const PORT = process.env.PORT || 3030;

export const ApiRoutes = {
    GET_NOTES: `http://localhost:${PORT}/api/notes`,

    NOTE_ID: `http://localhost:${PORT}/api/notes/`, //:id

    USER: `http://localhost:${PORT}/api/user`,

    USER_CREATE: `http://localhost:${PORT}/api/user/create`,

    USER_ID: `http://localhost:${PORT}/api/user/`, //:id

    GET_POST_NOTE: `http://localhost:${PORT}/api/user/note/`, //:id de user o de note
}

// /api/notes
// 	->getNotes

// /api/notes/:id
// 	->getNote
// 	->putNote
// 	->deleteNote

// /api/user
// 	->getUsers
// 	->postUserValidate

// /api/user/create
// 	->postUser

// /api/user/:id
// 	->getUser
// 	->putUser
// 	->deleteUser

// /api/user/:id/notes
// 	->postUserNote
//  	->getUserNote
