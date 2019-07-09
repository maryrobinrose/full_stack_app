//**This component provides the "Sign In" screen by rendering a form that allows a user to sign using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses).**//


//Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../components/Context';

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
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  render() {
    return(
      <Consumer>
        { ({ actions }) => {

          //Handle imput changes
          const handleSubmit = e => {
            e.preventDefault();
            console.log(this.state);
            //Uses input's name and value to set state
            actions.signIn(
              this.state.emailAddress,
              this.state.password,
              this.props
            ).then(() => {
              this.props.history.push('/courses');
            }).catch(error => {
              console.log('Please enter all credentials.')
              if (error.response.status === 400) {
                this.setState({
                  errorMessage: error.response.data.error.message
                });
              } else if (error.response.status === 401) {
                this.setState({
                  errorMessage: error.response.data.error.message
                });
              } else {
                this.props.history.push('/error');
              }
            });
          };

          return(

          <div className='bounds'>
            <div className='grid-33 centered signin'>
              <h1>Sign In</h1>

              {/*Show Validation Errors*/}
              <div className='validation-errors'>
                <ul>
                  <li>{this.state.errors}</li>
                </ul>
              </div>

                {/*Sign in with user credentials*/}
                <form onSubmit={handleSubmit}>

                  <div>
                    {/*Enter Email Address*/}
                    <input
                    id='emailAddress'
                    name='emailAddress'
                    type='text'
                    placeholder='Email Address'
                    onChange={this.handleInput}
                    value={this.state.emailAddress}
                    />

                    {/*Enter Password*/}
                    <input
                    id='password'
                    name = 'password'
                    type='password'
                    placeholder='Password'
                    onChange={this.handleInput}
                    value={this.state.password}
                    />
                  </div>

                  <div className="grid-100 pad-bottom">

                    {/*Sign in on Submit*/}
                    <button className="button" type="submit">Sign In</button>

                    {/*Go back to Main Courses*/}
                    <Link to='/courses' className="button button-secondary">Cancel</Link>
                  </div>

              </form>

              <p>&nbsp;</p>
              <p>Don't have a user account? <Link to='/signup'>Click here</Link> to sign up!</p>
            </div>
          </div>
          );
        }}
      </Consumer>
    )
  }
}

export default UserSignIn;
