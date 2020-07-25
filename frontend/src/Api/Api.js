//ESTO NO SIRVE XQ TOMA EL PORT DE REACT -> :3000

const protocol = window.location.protocol;
const URLmaster = window.location.host;

// const comentariosAjax = `${protocol}//${URLmaster}/Comentarios/ajax_listado`;

// const PORT = process.env.PORT || 3030;

export const ApiRoutes = {
    GET_POST_NOTES: `${protocol}//${URLmaster}/api/notes`,

    GET_PUT_DEL_NOTE: `${protocol}//${URLmaster}/api/notes/`, //:id de note

    USER_GET: `${protocol}//${URLmaster}/api/user`,

    USER_PUT_DEL: `${protocol}//${URLmaster}/api/user`,

    USER_CREATE: `${protocol}//${URLmaster}/api/user/signup`,

    USER_LOGIN: `${protocol}//${URLmaster}/api/user/login`,

    USER_CHANGE_PASS: `${protocol}//${URLmaster}/api/user/password`,

    USER_ID: `${protocol}//${URLmaster}/api/user/`, //:id

    USER_CHECK: `${protocol}//${URLmaster}/api/user/`
  
}

