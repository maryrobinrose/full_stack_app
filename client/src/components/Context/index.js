//

/*This was created with help from:
https://www.taniarascia.com/using-context-api-in-react/
https://codeburst.io/a-quick-intro-to-reacts-props-children-cb3d2fce4891
Treehouses's React Context API Course
and Zack Mower
*/

//**Provides a way to pass data to components without having to pass props manually at every level**//

//Imports
import React, { Component } from 'react';
import axios from 'axios';

//Sets up Provider and Consumer
const UserContext = React.createContext();

//Provider is used as high as possible in the component tree. It allows Consumer to subscribe to context changes
export class Provider extends Component {

  constructor() {
    super();

    //Set starting state to empty
    this.state = {
      authenticated: false,
      username: '',
      password: '',
      name: '',
      userId: null
    };
  }

  //Handle User Sign In
  handleSignIn  = (userUsername, userPassword, props) => {

    //Request user info from API using axios
    return axios({
      //User get method
      method: 'GET',
      url: 'http://localhost:5000/api/users',
      //Bring back the json data
      responseType: 'json',
      //Authorize user by using their log in
      auth: {
        username: userUsername,
        password: userPassword
      }
    })
    //On completion of receiving user data
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
    //Send user to main courses page after logging in
    // this.props.history.push('/courses');
  }

  //Handle User Sign Out
  handleSignOut = () => {

      //Reset state to hold no info
      this.setState({
        authenticated: false,
        username: '',
        password: '',
        name: '',
        userId: null
      })
  }

  //Show what has just been created
  render() {
    return(

      <UserContext.Provider value={{
        authenticated: this.state.authenticated,
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        userId: this.state.userId,
        actions: {
          signIn: this.handleSignIn,
          signOut: this.handleSignOut
        }
      }}>
        {/*Displays what's included between opening and closing tags when invoking a component*/}
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

//Consumer accesses the Provider to get the data it needs and helps avoid prop drilling
export const Consumer = UserContext.Consumer;
