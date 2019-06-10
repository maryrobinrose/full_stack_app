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
      axios.get(`http://localhost:5000/api/courses`)
      //Parse output to JSON
      .then (response => {
        this.setState({
          courses: response.data.data
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
            <h1>Course List</h1>

          </div>
        )
    }
  }


  export default Courses;
