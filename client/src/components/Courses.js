/*  Provides the "Courses" screen by

  -->> Retrieve the list of courses from the REST API's /api/courses route

  -->> Render a list of courses

  -->> Each course links to its respective "Course Detail" screen

  -->> Render a link to the "Create Course" screen

*/

//Import React library
import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';



class Courses extends Component {
    //Store the output from API request
    state = {
      courses: []
    };

    componentDidMount() {
      //Request the API
      axios.get('http://localhost:5000/api/courses/')
      //Parse output to JSON
      .then (response => {
        this.setState({
          courses: response.data
        });
      })
      //Log errors
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }

    render() {
      console.log(this.state.courses);
        return (
          <div>
            <h1>Courses</h1>
          </div>
        )
    }
  }


  export default Courses;
