//Import React library
import React from 'react';

const Courses = ({ courses }) => {
      return (
        <div>
          <center><h1>Course List</h1></center>
          {courses.map((courses) => (
              <div>
                <h5>{courses.title}</h5>
                <p>{courses.description}</p>
              </div>
          ))}
        </div>
      )
    };

    export default Courses
