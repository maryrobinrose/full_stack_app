//**main container component**//

//Imports
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { Provider } from './components/Context';


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

  render() {
    return (

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
    );
  }
}


export default App;
