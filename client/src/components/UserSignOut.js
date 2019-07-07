import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from '../components/Context';

const UserSignOut = () => {
  return (
   <Consumer>
     { ({ actions }) => {

       actions.signOut();

       return (
         <Redirect to="/" />
       );
     }}
   </Consumer>
 );
};

export default UserSignOut;
