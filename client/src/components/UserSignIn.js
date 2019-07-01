//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {

  state = {
    //empty strings
    emailAddress: '',
    password: ''
  };

  //Handle imput changes
  onChange = e => {
    e.preventDefault();
    //Uses input's name and value to set state
    this.setState({[e.target.name]: e.target.value});
  };

  render(){
    return(
      <div className='bounds'>
        <div className='grid-33 centered signin'>
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div><input
                id='emaillAddress'
                name = 'emailAddress'
                type='text'
                className=''
                placeholder='Email Address' value={this.state.emailAddress}
                onChange={e => this.change(e)}
              /></div>
              <div><input
                id='password'
                name = 'password'
                type='password'
                className=''
                placeholder='Password' value={this.state.password}
                onChange={e => this.change(e)}
              /></div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <Link to='/' className="button button-secondary">Cancel</Link>
              </div>
            </form>
          </div>
          <p>Don't have a user account? <Link to='/UserSignUp'>Click here</Link> to sign up!</p>
        </div>
      </div>
    )
  }


}

export default UserSignIn;
