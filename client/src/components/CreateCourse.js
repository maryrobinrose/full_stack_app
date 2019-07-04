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
    showError: '',
  }

  //Handle user changes
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  //Handle created course
  handleCreate = e => {
    e.preventDefault();

    const {title, description, estimatedTime, materialsNeeded} = this.state;

    if(title === '') {
      this.setState({
        showError: 'Please enter a title.'
      })
    } else if (description === '') {
      this.setState({
        showError: 'Please enter a description.'
      })
    /*} else if (description === '' && title === '') {
      this.setState({
        showError: 'Please enter a description and a title.'
      })*/
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/courses',
        auth: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        },
        data: {
          user: localStorage.getItem('id'),
          title,
          description,
          estimatedTime,
          materialsNeeded
        }
      })
      .then(alert('Your course has been created'))
      .then(() => {
        //Reset inputs
        this.setState({
          id: '',
          title: '',
          description: '',
          estimatedTime: '',
          materialsNeeded: '',
          showError: ''
        });
        //Send user back to main
        this.props.history.push('/courses');
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
    }
  }

  render() {

    const {showError, title, description, estimatedTime, materialsNeeded} = this.state;

    return(
      <div className='bounds course--detail'>
        <h1>Create Course</h1>
        <div>
        {showError ? (
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>{showError}</li>
              </ul>
            </div>
          </div>
        ) : ''}

          <form onSubmit={e => this.handleCreate(e, localStorage.getItem('username'), localStorage.getItem('password'), title, description, estimatedTime, materialsNeeded)}>
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
                    onChange={this.handleChange}
                  />
                </div>
                <p>By {this.state.username}</p>
              </div>
                <div className='course--description'>
                  <textarea
                    id='description'
                    name='description'
                    className=''
                    placeholder='Course Description...'
                    onChange={this.handleChange} />
                </div>
            </div>
            <div className='grid-25 grid-right'>
              <div className='course--stats'>
                <ul className='course--stats--list'>
                  <li className='class--stats--list--item'>
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id='estimatedTime'
                        name='estimatedTime'
                        className=''
                        type='text'
                        placeholder='Hours'
                        onChange={this.handleChange} />
                    </div>
                  </li>
                  <li className='course--stats--list--item'>
                    <h4>Materials Needed</h4>
                    <div>
                    <textarea
                      id='materialsNeeded'
                      name='materialsNeeded'
                      className=''
                      placeholder='List materials...'
                      onChange={this.handleChange} />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='grid-100 pad-bottom'>
              {/*Create Course button*/}
              <button className='button' type='submit'>Create Course</button>

              {/*Cancel button*/}
              <NavLink to='/' className='button button-secondary'>Cancel</NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateCourse;
