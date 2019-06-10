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
        // create an array of contacts only with relevant data
        const Courses = response.data.map(c => {
          return {
            title: c.title,
            description: c.description
          };
        });

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          courses: Courses
        });

        // store the new state object in the component's state
        this.setState(newState);

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
          <h1>Course List</h1>
        </div>
      );
    }
  }


  export default Courses;
