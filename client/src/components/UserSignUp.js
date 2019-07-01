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
  onSignUp(e) {
    e.preventDefault();

    const {firstName, lastName, emailAddress, password} = this.state;

    //If passwords don't match
    if (this.state.password !== this.state.confirmPassword) {
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
          if (error.response.status === 400) {
            this.setState({
              validationErrors: error.response.data.message,
            });
          } else if (error.response.status === 500) {
            this.props.history.push('/error');
          }
        });
    }
  }

  render() {

    return(
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign Up</h1>
          <div>
          {this.state.validationErrors && (this.validationErrors())}
            <form onSubmit={this.onSignUp}>
              <div>
                <input
                  id='firstName'
                  name='firstName'
                  className=''
                  type='text'
                  placeholder='First Name'
                  onChange={this.handleInput}
                />
              </div>
              <div>
                <input
                  id='lastName'
                  name='lastName'
                  className=''
                  type='text'
                  placeholder='Last Name'
                  onChange={this.handleInput}
                />
              </div>
              <div>
                <input
                  id='password'
                  name='password'
                  className=''
                  type='password'
                  placeholder='Password'
                  onChange={this.handleInput}
                />
              </div>
              <div>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  className=''
                  type='password'
                  placeholder='Confirm Password'
                  onChange={this.handleInput}
                />
              </div>
              <div className='grid-100 pad-bottom'>
                <button className='button' type='submit'>Sign Up</button>
                <Link className='button button-secondary' to='/'>Cancel</Link>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have an account? <Link to='/signin'>Click here</Link> to sign in.</p>
        </div>
      </div>
    )
  }
}


export default UserSignUp;
