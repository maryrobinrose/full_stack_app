//Import React library
import React from 'react';

const Courses = ({ courses }) => {
      return (
        <div>
          <center><h1>Course List</h1></center>
          {courses.map((course) => (
              <div>
                <h5>{course.title}</h5>
                <p>{course.description}</p>
              </div>
          ))}
        </div>
      )
    };

    export default Courses
