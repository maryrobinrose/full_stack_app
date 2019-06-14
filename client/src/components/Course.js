import React from 'react'

   const Course = ({ courses }) => {
     return (
       <div>
         <center><h1>Course List</h1></center>
         {courses.map((course) => (
           <div class="card">
             <div class="card-body">
               <h5 class="card-title">{course.title}</h5>
               <p class="card-text">{course.description}</p>
             </div>
           </div>
         ))}
       </div>
     )
   };

   export default Course
