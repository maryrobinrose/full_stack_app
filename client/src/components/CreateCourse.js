//Import React library
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class CreateCourse extends Component {

  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialdsNeeded: '',
    validationErrors: '',
  }

  //Handle user changes
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  //Handle created course
  onSubmit = e => {
    e.preventDefault();

    const {title, description} = this.state;

    if(title === '') {
      this.setState({
        validationErrors: 'Please enter a title.'
      })
    } else if (description === '') {
      this.setState({
        validationErrors: 'Please enter a description.'
      })
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/courses',
        auth: {
          username: localStorage.getItem('emailAddress'),
          password: localStorage.getItem('password')
        },
        data: {
          user: localStorage.getItem('id'),
          title: this.state.title,
          description: this.state.description,
          estimatedTime: this.state.estimatedTime,
          materialdsNeeded: this.state.materialdsNeeded
        }
      })
      .then(alert('Your course has been created'))
      .then(() => {
        this.props.push('/')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
    }
  }

  render() {

    const {validationErrors} = this.state;

    return(
      <div className='bounds course--detail'>
        <h1>Create Course</h1>
        <div>
        {validationErrors ? (
          <div>
            <h2 class="validation--errors--label">Validation errors</h2>
            <div class="validation-errors">
              <ul>
                <li>{validationErrors}</li>
              </ul>
            </div>
          </div>
        ) : ''}
        </div>
        <form onSubmit={e => this.onSubmit(e)}>
          <div className='grid-66'>
            <div className='course--header'>
              <h4 className='course--label'>Course</h4>
              <div>
                <input
                  id='title'
                  name='title'
                  type='text'
                  className='input-title course--title--input'
                  placeholder='Course title...'
                  onChange={this.onSubmit}
                />
              </div>
              <p>By{localStorage.getItem('name')}</p>
            </div>
              <div className='course--description'>
                <textarea
                  id='description'
                  name='description'
                  className=''
                  placeholder='Course Description...'
                  onChange={this.onSubmit} />
              </div>
          </div>
          <div className='grid=25 grid-right'>
            <div className='course--stats'>
              <ul className='course--stats--list'>
                <li className='class--stats--list--item'>
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      value={this.state.estimatedTime}
                      onChange={e => this.change(e)}
                      id='estimatedTime'
                      name='estimatedTime'
                      type='text'
                      className='course--time--input'
                      placeholder='Hours'
                    />
                  </div>
                </li>
                <li className='course--stats--list--item'>
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      value={this.state.materialdsNeeded}
                      onChange={e => this.change(e)}
                      id='materialdsNeeded'
                      name='materialdsNeeded'
                      placeholder='List materials...'
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='grid-100 pad-bottom'>
            <button className='button' type='submit'>Create Course</button>
            <NavLink to='/' className='button button-secondary'>Cancel</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateCourse;
