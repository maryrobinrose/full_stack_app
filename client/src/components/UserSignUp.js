/*This was created with help from:
https://reactjs.org/docs/refs-and-the-dom.html
https://medium.com/@mrewusi/a-gentle-introduction-to-refs-in-react-f407101a5ea6
*/

//**This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).**//

//Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from './components/Context';

class UserSignUp extends Component {

  constructor() {
    super();
    //Set errors to empty
    this.state = {
      errors: []
    }
  }

  //Create Refs for user input
  //Refs are assigned to an instance property so they can be referenced throughout the component
  firstName = React.createRef();
  lastName = React.createRef();
  emailAddress = React.createRef();
  password = React.createRef();
  confirmPassword = React.createRef();


  //Handle submit
  /*handleSignUp = (e, signIn, props) => {
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
  }*/

  render() {

    return(
      <Consumer>
      { ({changes}) => {

        //Handle input changes
        const handleInput = e => {
          e.preventDefault();

          this.setState({
            errors: []
          });

          



          <div className='bounds'>
            <div className='grid-33 centered signin'>
              <h1>Sign Up</h1>
              <div>

                <div>
                  <h2 className="validation--errors--label">Error</h2>
                  <div className="validation-errors">
                    <ul>
                      <li>{showError}</li>
                    </ul>
                  </div>
                </div>


                <form onSubmit={handleInput}>
                  <div>

                    {/*First Name*/}
                    <input
                      id='firstName'
                      name='firstName'
                      ref={this.firstName}
                      type='text'
                      placeholder='First Name'
                    />

                    {/*Last Name*/}
                    <input
                      id='lastName'
                      name='lastName'
                      ref={this.lastName}
                      type='text'
                      placeholder='Last Name'
                    />

                    {/*Email Address*/}
                    <input
                      id='emailAddress'
                      name='emailAddress'
                      ref={this.emailAddress}
                      type='text'
                      placeholder='Email Address'
                    />

                    {/*Password*/}
                    <input
                      id='password'
                      name='password'
                      ref={this.password}
                      type='password'
                      placeholder='Password'
                    />

                    {/*Confirm Password*/}
                    <input
                      id='confirmPassword'
                      name='confirmPassword'
                      ref={this.confirmPassword}
                      type='password'
                      placeholder='Confirm Password'
                    />
                  </div>

                  <div className='grid-100 pad-bottom'>

                    {/*Submit Button*/}
                    <button className='button' type='submit'>Sign Up</button>

                    {/*Cancel Button*/}
                    <Link className='button button-secondary' to='/courses'>Cancel</Link>
                  </div>
                </form>

              {/*Link to Sign In Page*/}
              <p>Already have a user account?<Link to='/signin'> Click here</Link> to sign in!</p>

          </div>
        );
      }}
      </Consumer>
    );
  }
}


export default UserSignUp;
