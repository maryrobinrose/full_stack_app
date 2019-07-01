//Import React library
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

//https://reacttraining.com/react-router/web/example/auth-workflow
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('username') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}


export default PrivateRoute;
