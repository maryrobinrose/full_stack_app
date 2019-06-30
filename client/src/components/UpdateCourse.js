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

    )
  }

}

export default UpdateCourse;
