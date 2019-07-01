import React from 'react';
import { Link } from 'react-router-dom';

const Error = (error) => {
  return(
    <div id='root'>
      <div className='bounds'>
        <h1>Error</h1>
          <p>An unexpected error has occured.</p>
          <Link className='button button-secondary' to='/courses'>Return to List</Link>
      </div>
    </div>
  )
}

export default Error;
