import React from 'react';

import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';

import Header from './Component/Header/Header';
// import CreateNote from './Component/CreateNote/CreateNote';
import ShowNotes from './Component/ShowNotes/ShowNotes';

function App() {
  return (

    <BrowserRouter>
      <Header></Header>
      {/* <CreateNote></CreateNote> */}
      <ShowNotes></ShowNotes>
      
    </BrowserRouter>
    
  );
}

export default App;
