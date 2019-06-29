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

    const {firstName, lastName, emailAddress, password, confirmPassword} = this.state;

    //If passwords don't match
    if (this.state.password != this.state.confirmPassword) {
      alert('Passwords are not a match');
      //If passwords do match
    } else {
      //Request the user
      axios.post('http://localhost:5000/api/users', {firstName, lastName, emailAddress, password})
        .then (res => {
          //If the response is successful
          if (res.status === 201) {
            //Reset validation errors to empty
            this.setState({
              validationErrors: ''
            })
            //Sign in user
            this.props.signIn(null, emailAddress, password);
          }
        })
        //Catch errors
        .catch(error => {

        })
    }

  }




}


export default UserSignUp;
