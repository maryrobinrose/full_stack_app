import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';


//Import Components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';

class App extends Component {

  state = {
    validationErrors: ''
    //Add authenticated user data
  }

  //Handle sign in
  onSignIn = (e, user) => {
    if (e) {
      e.preventDefault();
    }
    //Request user info
    axios.get('http://localhost:5000/api/users', {
      auth: {
        username: user.emailAddress,
        password: user.password
      }
    })
    //Once request is made
    .then (res => {
      if (res.status === 200) {
        this.setState({
          user: res.data,
          loggedIn: true,
          password: res.data.password,
          emailAddress: res.data.emailAddress,
          error: {}
        });
        
      }
    })
  }


  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Courses} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
