/*This was created with help from:
//https://reacttraining.com/react-router/web/example/auth-workflow
and Zack from Slack
*/

//**Configures protected routes**//

//Imports
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from '../components/Context';


const PrivateRoute = ({ component: Component, path }) => {
  return (
    <Route
      path={path}
      render={(props) => (
        <Consumer>
          {({ authenticated }) =>
            authenticated ? (
              <Component  {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/signin',
									state: { previousPage: path }
                }}
              />
            )
          }
        </Consumer>
      )}
    />
  );
};



export default PrivateRoute;
