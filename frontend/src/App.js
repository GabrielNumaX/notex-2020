import React from 'react';

import {BrowserRouter, Switch ,Route} from 'react-router-dom';

import './App.css';

import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
// import CreateNote from './Component/CreateNote/CreateNote';
import ShowNotes from './Component/ShowNotes/ShowNotes';

function App() {
  return (

    <BrowserRouter>
      {/* <Header></Header> */}

      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/notes" component={ShowNotes}></Route>

         {/* <CreateNote></CreateNote> */}
        {/* <ShowNotes></ShowNotes> */}

      </Switch>
     
      
    </BrowserRouter>
    
  );
}

export default App;
