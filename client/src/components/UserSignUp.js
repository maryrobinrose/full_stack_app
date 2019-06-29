//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    validationErrors: ''
  };

  //Handle imput changes
  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  //Handle cancel
  onCancel = e => {
    e.preventDefault();
    this.props.history.push('/courses');
  };

  //Handle submit
  onSignUp = e => {
    e.preventDefault();


  }




}


export default UserSignUp;
