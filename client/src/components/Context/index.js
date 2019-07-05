/*This was created with help from:
https://www.taniarascia.com/using-context-api-in-react/
and Treehouses's React Context API Course
*/

//**Provides a way to pass data to components without having to pass props manually at every level**//

//Imports
import React, { Component } from 'react';
import axios from 'axios';

//Sets up Provider and Consumer
const CoursesContext = React.createContext();

//export const Provider = CoursesContext.Provider;
//export const Consumer = CoursesContext.Consumer;

//Provider is used as high as possible in the component tree. It allows Consumer to subscribe to context changes
export class Provider extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      username: '',
      password: '',
      name: '',
      userId: null
    }
  }

  //Handle User Sign In
  handleSignIn  = (userUsername, userPassword, props) => {

    //Request user info from API using axios
    axios({
      //User get method
      method: 'GET',
      url: 'http://localhost:5000/api/users',
      //Bring back the json data
      responseType: 'json',
      auth: {
        username: userUsername,
        password: userPassword
      }
    })
    //On completion of receiving data
    .then (res => {

      //Declare variables
      let user = res.data;
      let userName = `${user.firstName} ${user.lastName}`;

      //Now set the state to logged in with user info
      this.setState({
        authenticated: true,
        username: user.emailAddress,
        password: userPassword,
        name: userName,
        userId: user.id
      })
    })
    //Catches any errors
    .catch(error => {
      //If there's a problem receiving the user's info
      if (error.response.status = 401) {
        const { history } = props;
        //Take the user to the error page
        history.push('/error')
      }
    })
  }

}

//Consumer access the Proivder to get the data it needs and helps avoid prop drilling
export const Consumer = CoursesContext.Consumer;
