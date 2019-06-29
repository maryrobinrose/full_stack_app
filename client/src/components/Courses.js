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
          {/*Map over and show courses with links*/}
          {this.state.courses.map((course, index) => (
              <div className='grid-33' key={index}>
                <Link className='course--module course--link' to={'/courses/' + course.id}>
                  <h4 className='course--label'>Course</h4>
                  <h3 className='course--title'>{course.title}</h3>
                </Link>
              </div>
          ))}

          {/*Link to Create Course*/}
          <div className='grid-33'>
            <Link className='course--module course--add--module' to='/courses/create'>
              <h3 className='course--add-title'>New Course</h3>
            </Link>
          </div>

        </div>
      )
    }
}


  export default Courses;
