//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

  state = {
    //empty strings
    emailAddress: '',
    passwords: ''
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

}
