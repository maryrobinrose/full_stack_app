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
      id: '',
      title: '',
      description: '',
      estimatedTime: '',
      materialdsNeeded: '',
      userId: '',
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

      .then(resData => {
          this.setState({
            id: resData.course.id,
            title: resData.course.title,
            description: resData.course.description,
            estimatedTime: resData.course.estimatedTime,
            materialdsNeeded: resData.course.materialdsNeeded,
            userId: resData.course.userId,
            firstName: resData.course.firstName,
            lastName: resData.course.lastName
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

          const ownsCourse = `${firstName} ${lastName}`;
          const { id, title, description, estimatedTime, materialsNeeded, firstName, lastName } = this.state;

          const handleChange = e => {
            this.setState({[e.target.name]: e.target.value});
          }

          const handleUpdate = e => {
            e.preventDefault();

            this.setState({errors: []});

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
                materialdsNeeded: this.state.materialsNeeded,
                userId: this.state.userId
              }
            })
            .then ( () => {
              this.props.history.push('/courses/' + this.props.match.params.id);
            })
            .catch(error => {
							// if user not signed in
							if (error.response.status === 401) {
								const { history } = this.props;
								history.push("/signin");
							}
							// if validation error (empty required fields)
							if (error.response.status === 400) {
								// update array of errors, use to display messages to user
								let errors = error.response.data.errors;
								let errorAlertMessages = errors.map(
									(error, index) => (
										<li className="validation-error" key={index}>
											{error}
										</li>
									)
								);
								// Update form validation errors in component state
								this.setState({
									errors: errorAlertMessages
								});
							}
						});
					};


          return (

            <div className='bounds course--detail'>

              {/*Update Form*/}
              <form onSubmit={handleUpdate}>
                <h1>Update Course</h1>

                {/*Error*/}
                <ul>{this.state.errors}</ul>

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

                      {/*Materials Needed*/}
                      <h4>Materials Needed</h4>

                        <textarea
                          id='materialdsNeeded'
                          name='materialdsNeeded'
                          placeholder='Materials Needed'
                          className=''
                          onChange={handleChange}
                          value={materialsNeeded}
                        />

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
