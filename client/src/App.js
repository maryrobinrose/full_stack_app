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

  //Set state
  state = {
    validationErrors: '',
    //Authenticated user data
    authenticatedUser: {}
  }


  //Handle sign in
  onSignIn = (e, user, email, password, name, from) => {
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
      //If OK
      if (res.status === 200) {
        this.setState({
          user: res.data,
          loggedIn: true,
          password: res.data.password,
          emailAddress: res.data.emailAddress,
          error: {}
        });
        //Save user preferences locally in the browser
        localStorage.setItem('username', email);
        localStorage.setItem('id', user.id);
        localStorage.setItem('password', password);
        localStorage.setItem('name', name);

        this.props.hitsory.push(from);

      } else {
        //If not OK
        this.props.history.push('/notfound');
      }
    })
    //Catch errors
    .catch(error => {
      if(error.response.status === 401) {
        this.setState({
          error: error.response
        });
      } else if (error.response.status === 500) {
        this.props.history.push('/error');
      }
    });
  }

  onSignOut() {
    //Clear user preferences
    localStorage.clear();

    //Clear validation errors
    this.setState({
      validationErrors: ''
    });

    //Bring user back to main
    this.props.history.push('/courses')
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Courses} />
            <PrivateRoute exact path='/create' component = {CreateCourse} />
            <Route exact path='/courses/:id' component={CourseDetail} />
            <PrivateRoute exact path='/courses/:id/update' component= {UpdateCourse} />
            <Route exact path='/courses/:id/update' component={UpdateCourse} />
            <Route exact path='/signin' component={UserSignIn} />
            <Route exact path='/signout' component={UserSignOut} />
            <Route exact path='/signup' component={UserSignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
