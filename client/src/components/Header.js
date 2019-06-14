//This is from project 7


//Connect to React and routes
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-nav">
      <ul>
        <li><NavLink exact to="/sunsets">Sunsets</NavLink></li>
        <li><NavLink to="/waterfalls">Waterfalls</NavLink></li>
        <li><NavLink to="/rainbows">Rainbows</NavLink></li>
      </ul>
    </header>
  );
}


export default Header;
