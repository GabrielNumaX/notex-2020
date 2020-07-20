//ESTO NO SIRVE XQ TOMA EL PORT DE REACT -> :3000

// const protocol = window.location.protocol;
// const URLmaster = window.location.host;

// const comentariosAjax = `${protocol}//${URLmaster}/Comentarios/ajax_listado`;

const PORT = process.env.PORT || 3030;

export const ApiRoutes = {
    GET_POST_NOTES: `http://localhost:${PORT}/api/notes`,

    GET_PUT_DEL_NOTE: `http://localhost:${PORT}/api/notes/`, //:id de note

    USER_PUT_DEL: `http://localhost:${PORT}/api/user`,

    USER_CREATE: `http://localhost:${PORT}/api/user/signup`,

    USER_LOGIN: `http://localhost:${PORT}/api/user/login`,

    USER_CHANGE_PASS: `http://localhost:${PORT}/api/user/password`,

    USER_ID: `http://localhost:${PORT}/api/user/`, //:id

    USER_CHECK: `http://localhost:${PORT}/api/user/`
  
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
