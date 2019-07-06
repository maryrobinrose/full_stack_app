//**Provides holder for each course**//

//Imports
import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ id, title}) => {
  return(
    <li key={id}>
     <Link to={`/courses/${id}`}>
       <div>Course</div>
       <div>{title}</div>
     </Link>
   </li>
  );
}

export default Course;
