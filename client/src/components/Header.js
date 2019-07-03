//Connect to React and routes
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from './UserContext';

const Header = () => {
  return (
    <UserContext.Consumer>{ ({authenticated, signOut, user}) => (


        <div className='header'>
          <div className='bounds'>
            <h1 className='header--logo'>
              <NavLink to='/courses' className='header--logo'>Courses</NavLink>
            </h1>
            {(authenticated) ?
            (
              <nav>
                <span>Welcome {user.firstName} {user.lastName}!</span>
                <Link to='/signout' onClick= {signOut} className='signout'>Sign Out</Link>
              </nav>

          )
          :
          (
              <nav>
              <Link className='signin' to={'/signin'}>Sign In</Link>
              <Link className='signup' to={'/signup'}>Sign Up</Link>
              </nav>
          )
        }
            </div>
        </div>
    )}
    </UserContext.Consumer>
  )
}


export default Header;
