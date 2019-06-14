/*  Provides the "Courses" screen by

  -->> Retrieve the list of courses from the REST API's /api/courses route

  -->> Render a list of courses

  -->> Each course links to its respective "Course Detail" screen

  -->> Render a link to the "Create Course" screen

*/

//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Import components
import Header from './Header';
import Course from './Course;'



class Courses extends Component {
    //Store the output from API request
    state = {
      courses: []
    };

    componentDidMount() {
      //Request the API
      axios.get('http://localhost:5000/api/courses/')
      //Parse output to JSON
      .then (res => res.json())
      .then ((data) => {
        this.setState({ courses: data })
      })
      //Log errors
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });

    render() {
      console.log(this.state.courses);
      return (
        <div>
          <Course courses={this.state.courses} />
        </div>
      )
    }

}


  export default Courses;
