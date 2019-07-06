//**This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.**//

//Imports
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from '../components/Context';

class UpdateCourse extends Component {

  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      description: '',
      estimatedTime: '',
      materialdsNeeded: '',
      userId: '',
      firstName: '',
      lastName: '',
      errores: []
    }
  }


  componentDidMount() {
    this.handleCourse();
  }

  handleCourse = e => {
    axios.get(`http://localhost:5000/api/courses/&{this.ptrops.match.params.id}`)
      .then(res => {
        if(res.data.userId !== parseInt(localStorage.getItem('id'))) {
          this.props.history.push('./forbidden')
        } else {
          this.setState({
            id: res.data.id,
            title: res.data.title,
            description: res.data.description,
            estimatedTime: res.data.estimatedTime,
            materialdsNeeded: res.data.materialdsNeeded,
            userId: res.data.userId,
            showError: ''
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.props.history.push('./notfound')
        } else if (error.response.status === 500){
          this.props.history.push('./error')
        }
      })
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();

    const {title, description} = this.state;

    if (title === '') {
      this.setState({showError: 'Please enter a title.'})
    } else if (description === '') {
      this.setState({showError: 'Please enter a description.'})
    } else {
      axios({
        method: 'put',
        url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
        auth: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        },
        data: {
          id: this.state.id,
          title: this.state.title,
          description: this.state.description,
          estimatedTime: this.state.estimatedTime,
          materialdsNeeded: this.state.materialsNeeded,
          userId: this.state.userId
        }
      })
      .then (res => {
        this.props.history.push('/courses/' + this.props.match.params.id);
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.props.history.push('./notfound')
        } else if (error.response.status === 500){
          this.props.history.push('./error')
        }
      })
    }


  }

  render() {

    const {showError, title, description, estimatedTime, materialsNeeded} = this.state;

    return(
      <div className='bounds course--detail'>
        <h1>Update Course</h1>
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
                    placeholder='Course Title'
                    onChange={this.handleSubmit}
                    value={this.course.title}
                  />
                </div>
                <p>By {this.state.username}</p>
              </div>
              <div className='course--description'>
                <textarea
                  id='description'
                  name='description'
                  className=''
                  placeholder='Course Description'
                  onChange={this.handleSubmit}
                  value={this.course.description}
                />
              </div>
            </div>
            <div className='grid-25 grid-right'>
              <div className='course--stats'>
                <ul className='courses--stats--list'>
                  <li className='course--stats--list--item'>
                    <h4>Estimated Time</h4>
                    <input
                      id='estimatedTime'
                      name='estimatedTime'
                      type='text'
                      className='course--time--input'
                      placeholder='Hours'
                      onChange={this.handleSubmit}
                      value={this.course.estimatedTime}
                    />
                  </li>
                  <li className='course--stats--list--item'>
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id='materialdsNeeded'
                        name='materialdsNeeded'
                        placeholder='Materials Needed'
                        className=''
                        onChange={this.handleSubmit}
                        value={this.course.materialsNeeded}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='grid-100 pad-bottom'>
              <button className='button' type='submit'>Update Course</button>
              <NavLink to='/courses' className='button button-secondary'>Cancel</NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default UpdateCourse;
