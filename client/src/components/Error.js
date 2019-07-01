import React from 'react';
import { Link } from 'react-router-dom';

const Error = (error) => {
  return(
    <div id='root'>
      <div className='bounds'>
        <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </div>
  )
}

export default Error;
