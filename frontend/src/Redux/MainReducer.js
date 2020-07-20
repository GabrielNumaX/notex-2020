import { getUser } from '../Auth/tokenHandler';

let user = getUser();

const initialState = {
    user:  user,
    login: false,
}

const MainReducer = (previousState = initialState, action) => {
    
    if(action.type === 'USER_AND_ID') {
        previousState = {
            user: action.userAction,
        }
        
        return {...previousState};
    }
    else if(action.type === 'LOG_IN'){

        previousState.login = action.loggedInAction;
            
        return{...previousState};
    }

    else if(action.type === 'LOG_OUT'){

        localStorage.removeItem('notex-token');
        localStorage.removeItem('notex-user');
        
        previousState = {
            login: false,
            user: '',
        }
            
        return{...previousState};
    }

  return {...previousState}
}

export default MainReducer;