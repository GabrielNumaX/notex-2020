import React, { Component } from 'react';
// import axios from 'axios';
import {BrowserRouter, Switch ,Route} from 'react-router-dom';

import {connect} from 'react-redux';

import './App.css';

// import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import CreateNote from './Component/CreateNote/CreateNote';
import ShowNotes from './Component/ShowNotes/ShowNotes';

class App extends Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     user: '',
  //     password: '',
  //   }
  // }

  render() {

    // console.log(this.state)
    return (

      <BrowserRouter>


        {/* <Route path="/" render={(routeProps) => this.props.reduxLoggedIn ?
                                              <ShowNotes {...routeProps}/>
                                              :
                                              <Home/>
                                              }/> */}

        <Switch>

          {/* <Route path="/notes" component={ShowNotes}/>   */}

          {/* <Route path="/" component={Home}/> */}

          {/* <Route path="/" render={(routeProps) => this.props.reduxLoggedIn ?
                                                  <ShowNotes {...routeProps}/>
                                                  :
                                                  <Redirect to={'/'}/>
                                                  }/> */}

          <Route path="/" exact render={(routeProps) => this.props.reduxLoggedIn ?
                                                  <ShowNotes {...routeProps}/>
                                                  :
                                                  <Home/>
                                                  }/>

          <Route path="/notes" render={(routeProps) => this.props.reduxLoggedIn ?
                                                    <CreateNote {...routeProps}/>
                                                  :
                                                  <Home/>}
                                                  />

          {/* <Route path="" render={(routeProps) => this.state.loggedin ? 
					<Component {...routeProps}/> 
					: 
					<Redirect to={"/url de component"}/>} 
          /> */}
      
          {/* <Route path="/notes" component={CreateNote}/> */}

          {/* <Route path="/create" component={CreateNote}/> */}

          {/* <Route path="/" component={Home}/> */}

        </Switch>
      
        
      </BrowserRouter>
      
    );
  }
}

// this reads from STORE
const mapGlobalStateToProps = (globalState) => {
  return {
      reduxUser: globalState.user,
      reduxUserId: globalState.userId,
      reduxLoggedIn: globalState.loggedIn
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