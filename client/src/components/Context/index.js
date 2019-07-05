/*This was created with help from:
https://www.taniarascia.com/using-context-api-in-react/
and Treehouses's React Context API Course
*/

//**Provides a way to pass data to components without having to pass props manually at every level**//

//Imports
import React { Component } from 'react';
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

  //Add Sign In

}

//Consumer access the Proivder to get the data it needs and helps avoid prop drilling
export const Consumer = CourseContext.Consumer;
