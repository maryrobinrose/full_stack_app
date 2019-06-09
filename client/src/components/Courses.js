//Import React library
import React, { Component } from 'react';
import axios from 'axios';


class Courses extends Component {
    //Store the output from API request
    state = {
      courses: []
    };

    componentDidMount() {
      //Request the API
      axios.get('http://localhost:5000/api/courses')
      //Parse output to JSON
      .then (response => {
        this.setState({courses: response.data});
      })
      //Log errors
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
    }


    render() {
      const { courses } = this.state;
      return (
          <div>
            <h1>Course List</h1>
            {Object.keys(courses).map(key => {

            })}
          </div>
      );
    }

  }

    export default Courses
