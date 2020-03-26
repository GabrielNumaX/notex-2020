import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter, Switch ,Route, Redirect} from 'react-router-dom';

import './App.css';

// import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import CreateNote from './Component/CreateNote/CreateNote';
import ShowNotes from './Component/ShowNotes/ShowNotes';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: localStorage.getItem('notexLog'),
      user: '',
      password: '',
      userToShow: '',
      userId: '',
    }
  }

  onInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    });

    // console.log(this.state)
  }

  logInSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:3000/api/user', {
          user: this.state.user,
          password: this.state.password
      })
      .then(response => {

          localStorage.setItem('notexLog', true);
          localStorage.setItem('notexUser', response.data.user);
          localStorage.setItem('notexUserId', response.data._id);

          this.setState({
              user: '',
              password: '',
              // loggedIn: response.data.login,
              loggedIn: localStorage.getItem('notexLog'),
              userToShow: localStorage.getItem('notexUser'),
              userId: localStorage.getItem('notexUserId')    
          })
      })
      .catch(err => console.log(err))
  } 

  logOut = () => {
    localStorage.setItem('notexLog', false);

    this.setState({
      loggedIn: localStorage.getItem('notexLog')
    });

    console.log(this.state.loggedIn);
  }

  render() {

    // console.log(this.state)
    return (

      <BrowserRouter>

        <Switch>

          <Route path="/notes" component={ShowNotes}/>
          
          {/* <Route path="/notes" render={(routeProps) => 

                                this.state.loggedIn ?

                                <ShowNotes {...routeProps}
                                userToShow={localStorage.getItem('notexUser')}
                                logOut={this.logOut}
                                userId={localStorage.getItem('notexUserId')}
                                loggedIn={localStorage.getItem('notexLog')}/>
                              :
                              <Redirect to="/"/>
                              }>
          </Route> */}

          <Route path="/create" 
                  render={(routeProps) => 

                    this.state.loggedIn ?

                    <CreateNote {...routeProps}
                    userToShow={localStorage.getItem('notexUser')}
                    userId={localStorage.getItem('notexUserId')}
                    logOut={this.logOut}/>
                    :
                    <Redirect to="/"/>
                  }>
          </Route>

          <Route path="/" exact 
                render={
                  (routeProps) => 
                  
                  // !this.state.loggedIn ?

                  <Home {...routeProps} 
                        onInputChange={(e) => this.onInputChange(e)}
                        onLogInSubmit={(e) => this.logInSubmit(e)}
                        userValue={this.state.user}
                        passwordValue={this.state.password}
                        userToShow={this.state.userToShow}
                        userId={this.state.userId}/>
                // :
                // <Redirect to={"/notes"}/>     
          }/>   
                  

          {/* <CreateNote></CreateNote> */}
          {/* <ShowNotes></ShowNotes> */}

        </Switch>
      
        
      </BrowserRouter>
      
    );
  }
}

export default App;
