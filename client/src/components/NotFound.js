import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return(
    <div>
      <div className='bounds'>
        <h1>Not Found</h1>
          <p>This page could not be found.</p>
          <Link className='button button-secondary' to='/courses'>Return to List</Link>
      </div>
    </div>
  )
}

export default NotFound;
