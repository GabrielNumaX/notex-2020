// const userDataFromLocal = JSON.parse(localStorage.getItem('notexUserData'));

// const loggedFromLocal = JSON.parse(localStorage.getItem('notexLog'));


// let user = null;
// let id = null;
// let loggedIn = null;

// //simple validation so AFTER THIS it works from localStorage
// if(userDataFromLocal === null){
//     user = '';
//     id = '';
// }
// else {
//     user = userDataFromLocal.user;
//     id = userDataFromLocal.userId

// }
// if(loggedFromLocal === null){
//     loggedIn = false;
// }
// else {
//     loggedIn = loggedFromLocal;
// }

// // console.log(user);
// // console.log(id);
// // console.log(loggedIn);

// const initialState = {
//     user:  user,
//     userId: id,
//     loggedIn: loggedIn
// }

import {getToken} from '../Auth/tokenHandler';

let isLogged = false

if(getToken()) {

    isLogged = true;
}

const initialState = {
    // user:  user,
    // userId: id,
    login: isLogged
}

const MainReducer = (previousState = initialState, action) => {
    
    if(action.type === 'USER_AND_ID') {
        previousState = {
            user: action.userAction,
            userId: action.userIdAction
        }
        
        return {...previousState};
    }
else if(action.type === 'LOG_IN_OUT'){

    previousState.login = action.loggedInAction;
        
    return{...previousState};
  }

  else if(action.type === 'LOG_OUT'){

    // localStorage.setItem('notexLog', false);
    localStorage.removeItem('notexLog');
    localStorage.removeItem('notexUserData');

    previousState = {
        // loggedIn: action.loggedInAction,
        loggedIn: false,
        user: '',
        userId: '',
    }
        
    return{...previousState};
  }

  return {...previousState}
}

export default MainReducer;