/*This was created with help from:
https://www.taniarascia.com/using-context-api-in-react/
and Treehouses's React Context API Course
*/

//**Provides a way to pass data to components without having to pass props manually at every level**//

//Imports
import React { Component } from 'react';
import axios from 'axios';

//React Context API
const Context = React.createContext();

//Provider is used as high as possible in the component tree. It allows Consumer to subscribe to context changes
export const Provider extends Component {
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
export const Consumer = Context.Consumer;
