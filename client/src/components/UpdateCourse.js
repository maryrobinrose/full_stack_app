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


}

export default UpdateCourse;
