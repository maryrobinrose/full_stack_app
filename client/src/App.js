import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
    state = {
          courses: []
    };


    componentDidMount() {
      axios.get('http://localhost:5000/api/')
      .then (res => res.json())
      .then((data) => {
        this.setState({ courses: data })
      })
      .catch(console.log)
    }

    render() {
      return (
        <BrowserRouter>
          <div>
          </div>
        </BrowserRouter>
      );
    }

  }


export default App;
