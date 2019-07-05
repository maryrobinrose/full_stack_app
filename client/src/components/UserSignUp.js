//Import React library
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import UserContext from './UserContext';

class UserSignUp extends Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    showError: ''
  };

  //Handle input changes
  handleInput = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  };


  //Handle submit
  handleSignUp = (e, signIn, props) => {
    e.preventDefault();

    const {firstName, lastName, emailAddress, password, confirmPassword} = this.state;


    //If passwords don't match
    if (password === '') {
      this.setState({
        showError: 'Please enter a password.'
      });
    } else if (password !== confirmPassword) {
      this.setState({
        showError: 'Passwords do not match.'
      });
      //If passwords do match
    } else {
      //Request the user
      axios.post('http://localhost:5000/api/users', {firstName, lastName, emailAddress, password})
        .then (res => {
          //If the response is successful
          if (res.status === 201) {
            //Remove show error
            this.setState({
              showError: ''
            })
            //Sign in user
            this.props.signIn(null, emailAddress, password);
          }
        })
        //Catch errors
        .catch(error => {
          if (error.response) {
            this.setState({error: error.response.data.message})
          } else  {
            this.props.history.push('/error');
          }
        });
    }
  }

  render() {

    const {showError, firstName, lastName, emailAddress, password} = this.state;

    return(
      <UserContext.Consumer>
      {({signUp}) => (
        <div className='bounds'>
          <div className='grid-33 centered signin'>
            <h1>Sign Up</h1>
            <div>

            {showError ? (
              <div>
                <h2 className="validation--errors--label">Error</h2>
                <div className="validation-errors">
                  <ul>
                    <li>{showError}</li>
                  </ul>
                </div>
              </div>
            ) : ''}

              <form onSubmit={e => this.handleSignUp(e, firstName, lastName, emailAddress, password)}>

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
                    id='emailAddress'
                    name='emailAddress'
                    className=''
                    type='text'
                    placeholder='Email Address'
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

                  {/*Submit Button*/}
                  <button className='button' type='submit'>Sign Up</button>

                  {/*Cancel Button*/}
                  <Link className='button button-secondary' to='/courses'>Cancel</Link>
                </div>

              </form>

            </div>
            <p>Already have a user account?<Link to='/signin'> Click here</Link> to sign in!</p>
          </div>

        </div>
      )}</UserContext.Consumer>
    )
  }
}


export default withRouter(UserSignUp);
