//Connect to React and routes
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from './UserContext';

const Header = () => {
  return (
    <UserContext.Consumer>{ ({Authenticated, signOut, user}) => (
      localStorage.getItem('username') ? (
        <div className='header'>
          <div className='bounds'>
            <NavLink to='/' className='header--logo'>Courses</NavLink>
            <nav>
              <span>Welcome {user.firstName} {user.lastName}!</span>
              <Link to='/signout' className='signout'>Sign Out</Link>
            </nav>
          </div>
        </div>
      ) : (
        <div className='header'>
            <div className='bounds header-bounds'>
              <NavLink to='/' className='header--logo'>Courses</NavLink>
              <nav>
              <Link className='signin' to={'/signin'}>Sign In</Link>
              <Link className='signup' to={'/signup'}>Sign Up</Link>
              </nav>
            </div>
        </div>
      )
    )}
    </UserContext.Consumer>
  )
}


export default Header;
