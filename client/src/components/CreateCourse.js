//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

export default CreateCourse;
