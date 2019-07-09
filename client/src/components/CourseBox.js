//add css

//**Provides holder for each course**//

//Imports
import React from 'react';
import { Link } from 'react-router-dom';

const CourseBox = ({ id, title}) => {
  return(
      <div className="grid-33">
        <li className='course-card' key={id}>
         <Link to={`/courses/${id}`}>
           <div className='course--label'>Course</div>
           <div className='course--title'>{title}</div>
         </Link>
        </li>
      </div>
  );
}

export default CourseBox;
