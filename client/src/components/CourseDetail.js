/*This was created with help from:
https://medium.com/@lcriswell/destructuring-props-in-react-b1c295005ce0
and Treehouses's React Context API Course
*/

//**Provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course.**//

//Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { Consumer } from '../components/Context';

class CourseDetail extends Component {

  constructor() {
    super();

    //Set starting state to empty
    this.state = {
      course: {},
      user: {},
      //User must own the course to edit or delete it
      ownsCourse: false,
    }
  }


  //When the componenet mounts, get course details
  componentDidMount() {
    this.handleGetCourse();
  }

  //Get course details
  handleGetCourse = () => {

    //Request the API and course details by the course's id using the GET method
    axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)

      //On completion of receiving user data
      .then (res =>
        //Grab the json
        res.json())

      .then(resData => {
        //Set state using user's data
        this.setState({
          course: resData.course,
          user: resData.course.user
        });
      })

      //Catch any errors
      .catch(error => {
        //If there is an error
        if (error) {
          //Then take user to the Not Found page
          this.props.history.push('/notfound');
        }
      });
  }

  //Show what has just been created
  render() {

    //Destructure
    //Allows us to extract multiple pieces of data from an array and assign them their own variables
    //const {firstName, lastName} = this.state.user;
    const {id} = this.state.course;
    //const {id, title, description, estimatedTime, materialsNeeded} = this.state.course;
    //const ownsCourse = `${firstName} ${lastName}`;


    return(
      <div>
        {/*Enclose return in Consumer*/}
        <Consumer>
            {/*Render props - returns a React element*/}
            {({ username, password, userId }) => {

              let isOwner = () => {
                let ownerId = this.state.course.userId;
                let authUserId = userId;

                if (ownerId === authUserId) {
                  return true;
                } else {
                  return false;
                }
              }

              //Handle Delete Course
              const handleDeleteCourse = () => {
                  //If the user owns the course
                  if (isOwner()) {

                    //Request to delete it
                    axios({
                    //Use delete method
                    method: 'DELETE',
                    url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,
                    //Authorize user by using their log in
                    auth: {
                      username: username,
                      password: password
                      }
                    })
                    //Take user back to main courses page
                    .then (res => {
                      this.props.history.push('/courses');
                    })
                    //Catch any errors
                    .catch(error => {
                      //Take user to error page
                      this.props.history.push('/error');
                    })
                  } else {
                    //Take user to forbidden page
                    this.props.history.push('/forbidden');
                  }
              }

    return(

            <div className='actions--bar'>
              <div className='bounds'>
                <div className='grid-100'>
                  <ul className='button-list'>

                    {/*If the user is the owner, show the update course option*/}
                    <li className='button primary' style={{display: isOwner() ? 'block' : 'none'}}>
                      <Link to={`/courses${id}/update`}>
                        <div className='button-text'>Update Course</div>
                      </Link>
                    </li>

                    {/*If the user is the owner, show the delete course option*/}
                    <li className='button primary' style={{display: isOwner() ? 'block' : 'none'}}>
                    <button onClick={handleDeleteCourse} className='button-primary'>
                        <div>Delete Course</div>
                      </button>
                    </li>

                    {/*Return to List button*/}
                    <li className='button button-secondary'>
                      <Link to='/courses'>Return to List</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
        </Consumer>

          {/*Course Title*/}
          <div className='bounds course--detail'>
            <div className='grid-66'>
              <div className='course--header'>
                <h4 className='course-label'>Course</h4>
                <h3 className='course--title'>{this.state.course.title}</h3>
                <p>By {this.state.username}</p>
              </div>
            </div>
          </div>

          {/*Course Description*/}
          <div className='course--description'>
            <ReactMarkdown soure={this.state.course.description} />
          </div>

            {/*Side Bar*/}
            <div className='grid-25 grid-right'>
              <div className='course--stats'>
                <ul className='course--stats--list'>

                {/*Estimated Time*/}
                  <li className='course--stats--list--item'>
                    <h4>Estimated Time</h4>
                    <h3>{this.state.course.estimatedTime}</h3>
                  </li>

                  {/*Materials Needed*/}
                  <li className='course--stats--list--item'>
                    <h4>Materials Needed</h4>
                    <ul>
                      <ReactMarkdown source={this.state.course.materialsNeeded} />
                    </ul>
                  </li>
                </ul>

              </div>
            </div>
        </div>
    )
  }
}


export default CourseDetail;
