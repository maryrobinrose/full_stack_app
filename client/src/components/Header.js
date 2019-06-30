//Connect to React and routes
import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
      <div className='header'>
          <div className='bounds header-bounds'>
            <NavLink to='/' className='header--logo'>Courses</NavLink>
            <nav>
            <Link className='signin' to={'/UserSignIn'}>Sign In</Link>
            <Link className='signup' to={'/UserSignUp'}>Sign Up</Link>
            </nav>
          </div>
      </div>

  );
}


export default Header;
