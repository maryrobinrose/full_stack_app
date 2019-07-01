//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component {

  //Set state
  state = {
    course: {},
    user: ''
  };

  //When the componenet mounts, get course details
  componentDidMount() {
    this.getCourse();
  }

  //Get course details
  getCourse = () => {
    //Request the API and course details
    axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)

      //When data is received
      .then (res => {
        const course = res.data;
        this.setState({
          course,
          username: course.User.firstName + ' ' + course.User.lastName
        });
      })

      //Log errors
      .catch(error => {
        console.log('Error fetching and parsing data', error);
        if (error.response.status === 400) {
          this.props.history.push('/notfound');
        } else if (error.response.status === 500) {
          this.props.history.push('/error');
        }
      });
  }

  //Delete course
  handleDeleteCourse = (e, emailAddress, password) => {
    e.preventDefault();

    axios.delete('http://localhost:5000/api/courses/' + this.props.match.params.id, {
      method: 'DELETE',
      auth: {
        username: emailAddress,
        password: password
      }
    })
    .then (res => {
      this.props.history.push('/courses');
    })
    .catch(error => {
      if (error.response.status === 404) {
        this.props.history.push('/notfound');
      } else if (error.response.status === 500) {
        this.props.history.push('/error');
      }
    })
  }


  render() {
    return(
      <div>

        <div className='actions--bar'>
          <div className='bounds'>
            <div className='grid-100'>

              {/*Add authenticated*/}
              <span>
              {(localStorage.getItem('id') )}
              </span>

              {/*Navigation Buttons*/}
              <span>
                <Link className='button' to={'/courses'+this.state.course.id+'/update'}>Update Course</Link>
                <button className='button' onClick={e => this.handleDeleteCourse()}>Delete Course</button>
              </span>
              <Link className='button button-secondary' to='/'>Return to List</Link>
            </div>
          </div>
        </div>

        {/*Course Title*/}
        <div className='bounds course--detail'>
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course-label'>Course</h4>
              <h3 className='course--title'>{this.state.course.title}</h3>
              <p>By {localStorage.getItem('name')}</p>
            </div>
          </div>
        </div>

        {/*Course Description*/}
        <div className='course--description'>
          <ReactMarkdown soure={this.state.course.description} />
        </div>

        {/*Estimated Time*/}
        <div className='grid-25 grid-right'>
          <div className='course--stats'>
            <ul className='course--stats--list'>
              <li className='course--stats--list--item'>
                <h4>Estimated Time</h4>
                <h3>{this.state.course.estimatedTime}</h3>
              </li>

              {/*Materials Needed*/}
              <li className='course--stats--list--item'>
                <h4>Materials Needed</h4>
                <ul>
                  <ReactMarkdown source={this.state.course.materialsNeeded} />
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}


export default CourseDetail;
