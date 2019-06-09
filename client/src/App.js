import React, { Component } from 'react';
import Courses from './components/Courses';
//import './App.css';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {
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
