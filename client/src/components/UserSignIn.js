//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

class UserSignIn extends Component {

  state = {
    //Set to empty strings
    emailAddress: '',
    password: ''
  };

  //Handle imput changes, set state value of each input field as value of changes
  handleInput = e => {
    e.preventDefault();
    //Uses input's name and value to set state
    this.setState({[e.target.name]: e.target.value});
  };


  render(){
    return(
      <UserContext.Consumer>
      {({signIn, showError}) => (
        <div className='bounds'>
          <div className='grid-33 centered signin'>
            <h1>Sign In</h1>
            <div>

            {/*How to make this different from title and description errors?*/}
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

              <form onSubmit={e => signIn(e,  this.state.emailAddress, this.state.password)}>

                <div>
                  <input
                  id='emailAddress'
                  name = 'emailAddress'
                  type='text'
                  className=''
                  placeholder='Email Address'
                  onChange={this.handleInput}
                  />
                </div>
                <div>
                  <input
                  id='password'
                  name = 'password'
                  type='password'
                  className=''
                  placeholder='Password'
                  onChange={this.handleInput}
                  />
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Sign In</button>
                  <Link to='/courses' className="button button-secondary">Cancel</Link>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
          </div>
        </div>
      )}
      </UserContext.Consumer>
    )
  }
}

export default UserSignIn;
