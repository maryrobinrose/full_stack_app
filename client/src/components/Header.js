//Connect to React and routes
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Consumer } from './UserContext'

const Header = () => {

  return (
    <Consumer>{({ user, Authenticated }) => (
      <div className='header'>
        <div className='bounds'>
          <NavLink to='/' className='header--logo'>Courses</NavLink>
          { (Authenticated) ?
              (<nav>
                <span>Welcome {localStorage.getItem('name')}!</span>
                <Link to='/signout' className='signout'>Sign Out</Link>
              </nav>
              )
              :
              (<nav>
                <Link className='signin' to={'/UserSignIn'}>Sign In</Link>
                <Link className='signup' to={'/UserSignUp'}>Sign Up</Link>
              </nav>
              )
          }
        </div>
      </div>
    )}
    </Consumer>
  );


  {/*if() {
    return(
      <div className='header'>
          <div className='bounds header-bounds'>
            <NavLink to='/' className='header--logo'>Courses</NavLink>
            <nav>
              <span>Welcome {localStorage.getItem('name')}!</span>
              <Link to='/signout' className='signout'>Sign Out</Link>
            </nav>
          </div>
      </div>
    )

    //If user is not logged in
  } else {
    return(
      <div className='header'>
          <div className='bounds header-bounds'>
            <NavLink to='/' className='header--logo'>Courses</NavLink>
            <nav>
            <Link className='signin' to={'/UserSignIn'}>Sign In</Link>
            <Link className='signup' to={'/UserSignUp'}>Sign Up</Link>
            </nav>
          </div>
      </div>
    )
  }*/}

}


export default Header;
