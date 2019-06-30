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
    this.getCourse();
  }

  getCourse = () => {
    axios.get('http://localhost:5000/api/courses' + this.props.match.params.id)
      .then(res)
  }

}

export default UpdateCourse;
