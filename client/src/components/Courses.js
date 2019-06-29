//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Courses extends Component {
    //Store the output from API request
    state = {
      courses: []
    };

    //When mounted
    componentDidMount() {
      //Request the API
      axios.get('http://localhost:5000/api/courses/')

      .then (res => {
        this.setState(res.data)
      })
      //Log errors
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
    }

    render() {
      console.log(this.state.courses);
      return (
        <div className='bounds'>
          {this.state.courses.map((course, index) => (
              <div className='grid-33' key={index}>
                <Link className='course--module course--link' to={'/courses/' + course.id}>
                  <h4 className='course--label'>Course</h4>
                  <h3 className='course--title'>{course.title}</h3>
                </Link>
              </div>
          ))}

        </div>
      )
    }
}


  export default Courses;
