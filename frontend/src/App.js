import React from 'react';
// import axios from 'axios';
import {BrowserRouter, Switch ,Route} from 'react-router-dom';

import {connect} from 'react-redux';

import './App.css';

// import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import CreateNote from './Component/CreateNote/CreateNote';
import ShowNotes from './Component/ShowNotes/ShowNotes';
import UserCreate from './Component/UserCreate/UserCreate';
import UserProfile from './Component/UserProfile/UserProfile';


const App = (props) => {


    return (

      <BrowserRouter>

        <Switch>

          <Route exact path="/" component={Home}/>

          <Route exact path="/create" component={CreateNote}/>

          <Route exact path="/notes" component={ShowNotes}/>

          <Route exact path="/signup" component={UserCreate}/>

          <Route exact path="/profile" component={UserProfile}/>


          {/* {
            props.reduxLoggedIn ? <Route exact path='/notes' component={ShowNotes}/> : <Redirect to='/'/>
          }

          {
            props.reduxLoggedIn ? <Route exact path="/create" component={CreateNote}/> : <Redirect to='/'/>    
          } */}

        </Switch>
      
        
      </BrowserRouter>
      
    );
  }

// this reads from STORE
const mapGlobalStateToProps = (globalState) => {
  return {
      reduxUser: globalState.user,
      reduxLoggedIn: globalState.login
  }
}

// this writes to STORE
const mapDispatchToProps = (dispatch) => {
  return {
      userAndId: (userProp, userIdProp) => {
          dispatch({type: 'USER_AND_ID', userAction: userProp, userIdAction: userIdProp})        
      },
      logIn: (loggedInProp) => {
          dispatch({type: 'LOG_IN', loggedInAction: loggedInProp})
      },
      logOut: (loggedInProp) => {
        dispatch({type: 'LOG_OUT', loggedInAction: loggedInProp})
    },
  }
}
export default connect(mapGlobalStateToProps, mapDispatchToProps)(App);