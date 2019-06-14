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
        <div className='bounds'>
          {this.state.courses.map( (course, index) => (
          <div>
            <Link>
              <h2>Courses</h2>
              <h3>{course.title}</h3>
            </Link>
          </div>
          ))}
        </div>
      )
    }

  }


  export default Courses;
