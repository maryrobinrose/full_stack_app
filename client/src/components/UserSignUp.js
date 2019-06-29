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

  onChange = e => {
    this.setState({[event.target.name]: event.target.value});
  };






}


export default UserSignUp;
