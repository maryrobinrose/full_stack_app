//

//**Provides holder for each course**//

//Imports
import React from 'react';
import { Link } from 'react-router-dom';

const CourseBox = ({ id, title}) => {
  return(
    <li key={id}>
     <Link to={`/courses/${id}`}>
       <div>Course</div>
       <div>{title}</div>
     </Link>
   </li>
  );
}

export default CourseBox;
