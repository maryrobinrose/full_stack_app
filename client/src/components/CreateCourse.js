/*This was created with help from:
https://reactjs.org/docs/refs-and-the-dom.html
https://medium.com/@mrewusi/a-gentle-introduction-to-refs-in-react-f407101a5ea6
and Zack from Slack
*/

//**This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses).**//

//Imports
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from '../components/Context';

class CreateCourse extends Component {

  constructor() {
    super();
    this.state = {
      errors: []
    }
  }

  //Create Refs for user input
  //Refs are assigned to an instance property so they can be referenced throughout the component
  title = React.createRef();
  description = React.createRef();
  estimatedTime = React.createRef();
  materialsNeeded = React.createRef();


  render() {

    return(
      <Consumer>
        { ({ username, password, name, userId}) => {

          //Handle user create
          const handleCreate = e => {
            e.preventDefault();
            this.setState({
              errors: []
            });

            let title = this.title.current.value;
            let description = this.description.current.value;
            let estimatedTime = this.estimatedTime.current.value;
            let materialsNeeded = this.materialsNeeded.current.value;

            if (title === ''  && description === '' && estimatedTime === '' && materialsNeeded === '') {
              this.setState(prevState => ({
                errors: 'Please enter all credentials.'
              }));
            } else {
              // Use POST method to send new info
              axios({
                method: 'POST',
                url: 'http://localhost:5000/api/courses',
                auth: {
                  username: username,
                  password: password
                },
                responseType: 'json',
                data: {
                  title: this.title.current.value,
                  description: this.description.current.value,
                  estimatedTime: this.estimatedTime.current.value,
                  materialsNeeded: this.materialsNeeded.current.value,
                  userId: userId
                }
              })
              .then(res => {
                this.props.history.push('/courses/');
              })
              .catch(error => {
                console.log('Please enter all credentials.')
                if (error.response.status === 400) {
                  this.setState({
                    errorMessage: error.response.data.error.message
                  });
                } else if (error.response.status === 401) {
                  this.setState({
                    errorMessage: error.response.data.error.message
                  });
                } else {
                  this.props.history.push('/error');
                }
  						});
          }
        }



          return (
            <div className='bounds course--detail'>
              <h1>Create Course</h1>

              {/*Show Validation Errors*/}
              <div className='validation-errors'>
                <ul>
                  <li>{this.state.errors}</li>
                </ul>
              </div>

              {/*Create Form*/}
              <form onSubmit={handleCreate}>

                <div className='grid-66'>
                  <div className='course--header'>

                    {/*Course Title*/}
                    <h4 className='course--label'>Course</h4>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        className='input-title course--title--input'
                        placeholder='Course title...'
                        ref={this.title}
                      />

                    {/*Course Creator*/}
                    <p>By {name}</p>

                    {/*Course Description*/}
                    <div className='course--description'>
                      <textarea
                            id='description'
                            name='description'
                            placeholder='Course Description...'
                            ref={this.description}
                            />
                    </div>
                  </div>

                  {/*Course Time*/}
                  <div className='grid-25 grid-right'>
                    <div className='course--stats'>
                      <h4>Estimated Time</h4>

                        <input
                          id='estimatedTime'
                          name='estimatedTime'
                          className='course--time--input'
                          type='text'
                          placeholder='Hours'
                          ref={this.estimatedTime}
                          />

                      {/*Course Materials*/}
                      <h4>Materials Needed</h4>
                        <textarea
                          id='materialsNeeded'
                          name='materialsNeeded'
                          placeholder='List materials...'
                          ref={this.materialsNeeded}
                          />

                    </div>
                  </div>
                </div>

                {/*Buttons*/}
                <div className='grid-100 pad-bottom'>
                    {/*Create Course button*/}
                    <button className='button' type='submit'>Create Course</button>

                    {/*Cancel button*/}
                    <NavLink to='/courses' className='button button-secondary'>Cancel</NavLink>
                </div>

              </form>
            </div>
          );
				}}
			</Consumer>
    );
  }
}


export default withRouter (CreateCourse);
