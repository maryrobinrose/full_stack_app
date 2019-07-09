//**This component provides the "Courses" screen by retrieving the list of courses from the REST API's /api/courses route and rendering a list of courses. Each course needs to link to its respective "Course Detail" screen. This component also renders a link to the "Create Course" screen.**//

//Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CourseBox from './CourseBox';

class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

    //When mounted
    componentDidMount() {
      //Request the API
      fetch('http://localhost:5000/api/courses/')

      //Returns a promise (only works with fetch, not axios)
      .then(response => response.json())

      .then (resData => {
        this.setState({
          courses: resData.courses
        });
      })
      //Log errors
      .catch(error => {
        if (error.response.status === 500) {
            this.props.history.push('/error');
          }
      })
    }

    render() {

        return(
          <div>
            <ul>

            {/*Map over courses*/}
            {this.state.courses.map(course => (
              <CourseBox
                id={course.id}
                key={course.id}
                title={course.title}
              />
            ))}


              {/*Show Add New Course button*/}
              <li>
                <Link className='course--module course--add--module' to='/courses/create'>
                  <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      viewBox="0 0 13 13" className="add">
                      <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>New Course</h3>
                </Link>

              </li>
            </ul>
          </div>
      );
    }
}

  export default Courses;
