/*This was created with help from:
https://www.taniarascia.com/using-context-api-in-react/
and Treehouses's React Context API Course
*/

//**Provides a way to pass data to components without having to pass props manually at every level**//

import React { Component } from 'react';
import axios from 'axios';

//React Context API
const UserContext = React.createContext();


export const Provider = UserContext.Provider


export const Consumer = UserContext.Consumer

export default UserContext;
