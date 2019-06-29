//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    this.setState({[event.target.name]: event.target.value});
  };

  onCancel = e => {
    e.preventDefault();
    this.props.history.push('/courses');
  };

  onSignUp =




}


export default UserSignUp;
