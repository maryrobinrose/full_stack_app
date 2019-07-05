//Imports
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { Provider } from './Context';


//Import Components
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Header from './components/Header';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';
import Error from './components/Error';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';

//Global state
class App extends Component {

  //Set state
  state = {
    showError: '',
    userData: {},
    username: '',
    password: '',
    authenticated: false
  }


  //Handle sign in
  onSignIn = (e, user, emailAddress, password, name, props) => {
    if (e) {
      e.preventDefault();
    }
    //Request user info
    axios.get('http://localhost:5000/api/users', {
      auth: {
        username: emailAddress,
        password: password
      }
    })
    //Once request is made
    .then (res => {
      //If OK
      if (res.status === 200) {
        const user = res.data;
        const name = user.firstName + ' ' + user.lastName;
        this.setState({
          user,
          password: user.password,
          username: user.emailAddress,
          showError: '',
          authenticated: true
        });

        //Save user preferences locally in the browser
        localStorage.setItem('username', user);
        localStorage.setItem('id', user.id);
        localStorage.setItem('password', password);
        localStorage.setItem('name', name);


        //Brin user back to Main Courses
        this.props.history.push('/courses');

      } else {
        localStorage.clear();
        this.props.history.push('/signup');
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

  onSignOut = () => {
    //Clear user info
    localStorage.clear();
    console.log('User is signed out');

    //Clear state
    this.setState({
      userData: {},
      username: '',
      password: '',
      authenticated: false
    });

    //Bring user back to main
    this.props.history.push('/courses')
  }

  render() {
    return (

      <Provider
        value={{
          user: this.state.user,
          emailAddress: this.state.emailAddress,
          password: this.state.password,
          authenticated: this.state.authenticated,
          actions: {
          signIn: this.onSignIn.bind(this),
          signOut: this.onSignOut.bind(this)
          }
        }}>
        <BrowserRouter>
          <div className='bounds'>
            <Header />
              <Switch>

                {/*Redirects route to /courses*/}
                <Route exact path='/' render={() => <Redirect to='courses'/>} />

                {/*Routes for Courses*/}
                <Route exact path='/courses' render={() => <Courses />} />
                <PrivateRoute exact path='/courses/create' component = {CreateCourse} />
                <Route exact path='/courses/:id' component={CourseDetail}/>
                <PrivateRoute exact path='/courses/:id/update' component= {UpdateCourse} />

                {/*Sign In, Out, and Up routes */}
                <Route path='/signin' render={() => <UserSignIn/>} />
                <Route path='/signout' render={() => <UserSignOut/>} />
                <Route path='/signup' render={() => <UserSignUp/>} />

                {/*Route for errors*/}
                <Route exact path="/error" render={() => <Error />} />
                <Route exact path='/notfound' component = {NotFound} />
                <Route exact path='/forbidden' component = {Forbidden} />

              </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;
