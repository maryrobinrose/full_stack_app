//**Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's first and last name and a button for signing out (if there's an authenticated user).**//


//Imports
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Consumer } from './components/Context';

const Header = () => {
  return (
    <Consumer>{ ({signedIn, name}) => {

      return(
        <header>
          <div className='header'>
            <div className='bounds'>

              {/*Link back to main Courses*/}
              <h1 className='header--logo'>
                <NavLink to='/courses' className='header--logo'>Courses</NavLink>
              </h1>

              <nav className='main-nav'>
                {/*Wecomes user by name*/}


                {/*Link for Signing Out*/}





                {/*Link back to main Courses*/}
                <h1 className='header--logo'>
                  <NavLink to='/courses' className='header--logo'>Courses</NavLink>
                </h1>


                  {/*Link to Sign In Page*/}
                  <Link className='signin' to={'/signin'}>Sign In</Link>
                  {/*Link to Sign Out Page*/}
                  <Link className='signup' to={'/signup'}>Sign Up</Link>


            </nav>
          </div>
        </header>
      )
    }}
    </Consumer>
  )
}


export default Header;
