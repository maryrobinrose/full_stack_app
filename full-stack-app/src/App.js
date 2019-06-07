import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import axios from 'axios';

class App extends Component () {
  render () {
    return (
      state = {
        courses: []
      }
      componentDidMount() {
        axios.get('http://localhost:5000/api/')
      }
    /*<BrowserRouter>
        <div className="container">

        </div>
      </BrowserRouter>*/

    );
  }
}

export default App;
