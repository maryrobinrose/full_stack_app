//add css

//**Provides holder for each course**//

//Imports
import React from 'react';
import { Link } from 'react-router-dom';

const CourseBox = ({ id, title}) => {
  return(
    <li className='bounds' key={id}>
     <Link to={`/courses/${id}`}>
       <div className=''>Course</div>
       <div className=''>{title}</div>
     </Link>
   </li>
  );
}

export default CourseBox;
