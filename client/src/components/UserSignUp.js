/*This was created with help from:
https://reactjs.org/docs/refs-and-the-dom.html
https://medium.com/@mrewusi/a-gentle-introduction-to-refs-in-react-f407101a5ea6
*/

//**This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).**//

//Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from '../components/Context';

class UserSignUp extends Component {

  constructor() {
    super();
    //Set errors to empty
    this.state = {
      errorMessage: ''
    }
  }

  //Create Refs for user input
  //Refs are assigned to an instance property so they can be referenced throughout the component
  firstName = React.createRef();
  lastName = React.createRef();
  emailAddress = React.createRef();
  password = React.createRef();
  confirmPassword = React.createRef();

  render() {

    return(
      <Consumer>
      { ({actions}) => {

        //Handle input changes when user submits the form
        const handleInput = e => {
          e.preventDefault();
          //Set errors to empty
          this.setState({
            errors: []
          });

          //Set values of each user input
          let userFirstName = this.firstName.current.value;
          let userLastName = this.lastName.current.value;
          let userEmailAddress = this.emailAddress.current.value;
          let userPassword = this.password.current.value;
          let userConfirmPassword = this.confirmPassword.current.value;

          //If passwords are not a match
          if (userPassword !== userConfirmPassword) {

            //Show errors
            this.setState(prevState => ({
              errors: 'Passwords must match.'
            }));

          } else {
            //Request the user
            axios({
              method: 'POST',
              url: 'http://localhost:5000/api/users',
              data: {
                firstName: userFirstName,
                lastName: userLastName,
                emailAddress: userEmailAddress,
                password: userPassword
              }
            })
            .then( () => {
              return actions.signIn(
                userEmailAddress,
                userPassword,
                this.props
              );
            }).then(() => {
              this.props.history.push('/courses');
            })
            //Catch any errors
            .catch(error => {
              console.log('Please enter all credentials.')
              if (error.response.status === 400) {
                this.setState({
                  errorMessage: error.response.data.message
                });
              } else if (error.response.status === 401) {
                this.setState({
                  errorMessage: error.response.data.message
                });
              } else {
                this.props.history.push('/error');
              }
            });
	}
};

        return (

          <div className='bounds'>
              <div className='grid-33 centered signin'>
                <h1>Sign Up</h1>

                {/*Show Validation Errors*/}
                <div className='validation-errors'>
                  <ul>
                    <li>{this.state.errorMessage}</li>
                  </ul>
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
          </div>
        );
      }}
      </Consumer>
    );
  }
}


export default UserSignUp;
