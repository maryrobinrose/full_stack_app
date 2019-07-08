//**This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.**//

//Imports
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from '../components/Context';


class UpdateCourse extends Component {

  constructor() {
    super();
    this.state = {
      id: null,
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: null,
      firstName: '',
      lastName: '',
      emailAddress: '',
      errors: []
    }
  }



  componentDidMount() {
    this.handleCourse();
  }

  handleCourse = e => {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => response.json())

      .then(responseData => {
          this.setState({
            id: responseData.course.id,
            title: responseData.course.title,
            description: responseData.course.description,
            estimatedTime: responseData.course.estimatedTime,
            materialsNeeded: responseData.course.materialsNeeded,
            userId: responseData.course.userId,
            firstName: responseData.course.firstName,
            lastName: responseData.course.lastName
          })
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.props.history.push('./notfound')
        } else if (error.response.status === 500){
          this.props.history.push('./error')
        }
      })
  }

  render() {

    return(
      <Consumer>

        { ({ username, password, userId}) => {


          const { id, title, description, estimatedTime, materialsNeeded, firstName, lastName } = this.state;
          const ownsCourse = `${firstName} ${lastName}`;

          const handleChange = e => {
            this.setState({[e.target.name]: e.target.value});
          }

          const handleUpdate = e => {
            e.preventDefault();

            this.setState({errors: []});

            if (title === ''  && description === '' && estimatedTime === '' && materialsNeeded === '') {
              this.setState(prevState => ({
                errors: 'Please enter all credentials.'
              }));
            } else {

              axios({
                method: 'PUT',
                url: `http://localhost:5000/api/courses/${id}`,
                auth: {
                  username: username,
                  password: password
                },
                responseType: 'json',
                data: {
                  id: this.state.id,
                  title: this.state.title,
                  description: this.state.description,
                  estimatedTime: this.state.estimatedTime,
                  materialsNeeded: this.state.materialsNeeded,
                  userId: this.state.userId
                }
              })
              .then ( () => {
                this.props.history.push('/courses/' + this.props.match.params.id);
              })
              .catch(error => {
                console.log('Please enter all credentials.')
                if (error.response.data.errors) {
  								//Fill in empty error state with errors
                  this.setState(prevState => ({
                    errors: 'Please enter all credentials.'
                  }));
                } //else {
                  //Bring user to error page
                  //this.props.history.push('/error');
                //}
  						});
  					};
          }


          return (

            <div className='bounds course--detail'>
              <h1>Update Course</h1>

              {/*Show Validation Errors*/}
              <div className='validation-errors'>
                <ul>
                  <li>{this.state.errors}</li>
                </ul>
              </div>

              {/*Update Form*/}
              <form onSubmit={handleUpdate}>

                <div className='grid-66'>
                  <div className='course--header'>

                    {/*Course Title*/}
                    <h4 className='course--label'>Course</h4>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        className='input-title course--title--input'
                        placeholder='Course Title'
                        onChange={handleChange}
                        value={title}
                      />

                    {/*Name of Course Owner*/}
                    <p>By {ownsCourse}</p>

                    {/*Course Description*/}
                    <div className='course--description'>
                      <textarea
                        id='description'
                        name='description'
                        className=''
                        placeholder='Course Description'
                        onChange={handleChange}
                        value={description}
                      />
                    </div>
                  </div>

                  {/*Estimated Time*/}
                  <div className='grid-25 grid-right'>
                    <div className='course--stats'>
                      <ul className='course--stats--list'>
                        <li className='course--stats--list--item'>

                          <h4>Estimated Time</h4>
                            <input
                              id='estimatedTime'
                              name='estimatedTime'
                              type='text'
                              className='course--time--input'
                              placeholder='Hours'
                              onChange={handleChange}
                              value={estimatedTime}
                            />
                        </li>
                        <li className='course--stats--list--item'>
                          {/*Materials Needed*/}
                          <h4>Materials Needed</h4>

                            <textarea
                              id='materialsNeeded'
                              name='materialsNeeded'
                              placeholder='Materials Needed'
                              className=''
                              onChange={handleChange}
                              value={materialsNeeded}
                            />
                        </li>
                      </ul>

                    </div>
                  </div>
                </div>

                {/*Buttons*/}
                <div className='grid-100 pad-bottom'>
                    {/*Update Course button*/}
                    <button className='button' type='submit'>Update Course</button>

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

export default withRouter (UpdateCourse);
