//Connect to React and routes
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from './UserContext';

const Header = () => {
  return (
    <UserContext.Consumer>{ ({authenticated, signOut, user}) => (

      localStorage.getItem('username') ? (


        <div className='header'>
          <div className='bounds'>

            {/*Link back to main Courses*/}
            <h1 className='header--logo'>
              <NavLink to='/courses' className='header--logo'>Courses</NavLink>
            </h1>

              <nav>
                {/*Wecomes user by name*/}
                <span>Welcome {localStorage.getItem('name')}!</span>

                {/*Link for Signing Out*/}
                <Link to='/signout' onClick= {signOut} className='signout'>Sign Out</Link>
              </nav>

          </div>
        </div>

          )
          :
          (

            <div className='header'>
              <div className='bounds'>

              {/*Link back to main Courses*/}
              <h1 className='header--logo'>
                <NavLink to='/courses' className='header--logo'>Courses</NavLink>
              </h1>

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
