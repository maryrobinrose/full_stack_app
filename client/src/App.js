import React, { Component } from 'react';
import Courses from './components/Courses';
//import './App.css';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
    //Store the output from API request
    state = {
      courses: []
    };

    componentDidMount() {
      //Request the API
      axios.get('http://localhost:5000/api/courses')
      //Parse output to JSON
      .then (res => res.json())
      //Set value of the state to the output from API
      .then((data) => {
        this.setState({ courses: data })
      })
      //Log errors to console
      .catch(console.log)
    }

    render() {
      return (
        <BrowserRouter>
          <div>
            <Courses courses={this.state.courses} />
          </div>
        </BrowserRouter>
      );
    }

  }


export default App;
