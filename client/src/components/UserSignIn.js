//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

class UserSignIn extends Component {

  state = {
    //empty strings
    emailAddress: '',
    password: ''
  };

  //Handle imput changes
  handleInput = e => {
    e.preventDefault();
    //Uses input's name and value to set state
    this.setState({[e.target.name]: e.target.value});
  };

  //Handle submit
  handleSubmit = e => {
    e.preventDefault();
  }

  render(){
    return(
      <UserContext.Consumer>
      {({signIn}) => (
        <div className='bounds'>
          <div className='grid-33 centered signin'>
            <h1>Sign In</h1>
            <div>
              <form onSubmit={e => this.handleSubmit(e, signIn, this.state.emailAddress, this.state.password)}>
                <div><input
                  id='emaillAddress'
                  name = 'emailAddress'
                  type='text'
                  className=''
                  placeholder='Email Address'
                  onChange={this.handleInput}
                /></div>
                <div><input
                  id='password'
                  name = 'password'
                  type='password'
                  className=''
                  placeholder='Password'
                  onChange={this.handleInput}
                /></div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Sign In</button>
                  <Link to='/' className="button button-secondary">Cancel</Link>
                </div>
              </form>
            </div>
            <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
          </div>
        </div>
      )}
      </UserContext.Consumer>
    )
  }
}

export default UserSignIn;
