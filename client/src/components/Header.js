//**Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's first and last name and a button for signing out (if there's an authenticated user).**//


//Imports
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from '../components/Context';

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

              {/*Nav changes based on user log in*/}
              <nav className='main-nav'>
                <ul>
                  <li>
                    {/*Wecomes user by name*/}
                    <NavLink to={signedIn ? '' : '/signup'}>{signedIn ? `Welcome ${name}` : 'Sign Up'}</NavLink>
                  </li>
                  <li>
                    {/*Link for Signing Out*/}
                    <NavLink to={signedIn ? '/signout' : '/signin'}>{signedIn ? 'Sign Out' : 'Sign In'}</NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      )
    }}
    </Consumer>
  )
}


export default Header;
