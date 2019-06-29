//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component {

      state = {
        course: [],
        user: []
      };



  componentDidMount() {
    //Request the API and course details
    axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)

    .then (res => {
      this.setState({
        course: res.data,
        user: res.data.user
      });
    })
    //Log errors
    .catch(error => {
      if (error.response.status === 400) {
        this.props.history.push('/notfound');
      } else if (error.response.status = 500) {
        this.props.history.push('/error');
      }
    });
  }

  handleDeleteCourse = (e) => {
    e.preventDefaults();

    axios.delete('http://localhost:5000/api/courses/' + this.props.match.params.id, {
      method: 'DELETE',
    })
    .then (res => {
      this.props.history.push('/courses');
    })
    .catch(error => {
      if (error.response.status === 404) {
        this.props.history.push('/notfound');
      } else {
        this.props.history.push('/error');
      }
    })
  }


  render() {
    return(
      <div className='actions--bar'>
        <div className='bounds'>
          <div className='grid-100'>
            <Link className='button button-secondary' to='/courses'>Return to List</Link>
            <Link className='button' to={'/courses'+this.state.course.id+'/update'}>Update Course</Link>
            <button className='button' onClick={e => this.handleDeleteCourse()}>Delete Course</button>
          </div>
        </div>
      </div>
    )
  }







}


export default CourseDetail;
