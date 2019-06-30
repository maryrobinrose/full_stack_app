//Import React library
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

  state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialdsNeeded: '',
    userid: '',
    createdBy: '',
    validationErrors: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses' + this.props.match.params.id)
      .then(res => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          description: res.data.description,
          estimatedTime: res.data.estimatedTime,
          materialdsNeeded: res.data.materialdsNeeded,
          userId: res.data.userId,
          validationErrors: ''
        })
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  onSubmit = e => {
    e.preventDefault();
      axios({
        method: 'put',
        url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
        auth: {
          username: localStorage.getItem('emailAddress'),
          password: localStorage.getItem('password')
        },
        data: {
          id: this.state.id,
          title: this.state.title,
          description: this.state.description,
          estimatedTime: this.state.estimatedTime,
          materialdsNeeded: this.state.materialsNeeded
        }
      })
      .then (res => {
        this.props.history.push('/courses/' + this.props.match.params.id);
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }

  onCancel = e => {
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return(
      <div className='bounds course--detail'>
        <h1>Update Course</h1>
        <div>
        {this.state.validationErrors && (this.validationErrors())}
          <form onSubmit={this.onSubmit}>
            <div className='grid-66'>
              <div className='course--header'>
                <h4 className='course--label'>Course</h4>
                <div>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    className='input-title course--title--input'
                    placeholder='Course Title'
                  />
                </div>
                <p>By{localStorage.getItem('name')}</p>
              </div>
              <div className='course--description'>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default UpdateCourse;
