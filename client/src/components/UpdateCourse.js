//Import React library
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

  state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialdsNeeded: '',
    userid: '',
    createdBy: '',
    validationErrors: ''
  }


  componentDidMount() {
    this.handleCourse();
  }

  handleCourse = e => {
    axios.get('http://localhost:5000/api/courses' + this.props.match.params.id)
      .then(res => {
        if(res.data.userId !== parseInt(localStorage.getItem('id'))) {
          this.props.history.push('./forbidden')
        } else {
          this.setState({
            id: res.data.id,
            title: res.data.title,
            description: res.data.description,
            estimatedTime: res.data.estimatedTime,
            materialdsNeeded: res.data.materialdsNeeded,
            userId: res.data.userId,
            validationErrors: ''
          })
        }
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.props.history.push('./notfound')
        } else if (error.response.status === 500){
          this.props.history.push('./error')
        }
      })
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();

    if (title === '') {
      this.setState({validationErrors: 'Please enter a title.'})
    } else if (description === '') {
      this.setState({validationErrors: 'Please enter a description.'})
    } else {
      axios({
        method: 'put',
        url: 'http://localhost:5000/api/courses/' + this.props.match.params.id,
        auth: {
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        },
        data: {
          id: this.state.id,
          title: this.state.title,
          description: this.state.description,
          estimatedTime: this.state.estimatedTime,
          materialdsNeeded: this.state.materialsNeeded
        }
      })
      .then (res => {
        this.props.history.push('/courses/' + this.props.match.params.id);
      })
      .catch(error => {
        if (error.response.status === 400) {
          this.props.history.push('./notfound')
        } else if (error.response.status === 500){
          this.props.history.push('./error')
        }
      })
    }


  }

  onCancel = e => {
    e.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return(
      <div className='bounds course--detail'>
        <h1>Update Course</h1>
        <div>
        {this.state.validationErrors && (this.validationErrors())}
          <form onSubmit={this.onSubmit}>
            <div className='grid-66'>
              <div className='course--header'>
                <h4 className='course--label'>Course</h4>
                <div>
                  <input
                    id='title'
                    name='title'
                    type='text'
                    className='input-title course--title--input'
                    placeholder='Course Title'
                  />
                </div>
                <p>By{localStorage.getItem('name')}</p>
              </div>
              <div className='course--description'>
                <textarea
                  id='description'
                  name='description'
                  className=''
                  placeholder='Course Description'
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className='grid-25 grid-right'>
              <div className='course--stats'>
                <ul className='courses--stats--list'>
                  <li className='course--stats--list--item'>
                    <h4>Estimated Time</h4>
                    <input
                      id='estimatedTime'
                      name='estimatedTime'
                      type='text'
                      className='course--time--input'
                      placeholder='Estimated Time'
                      value={this.state.estimatedTime}
                      onChange={this.onChange}
                    />
                  </li>
                  <li className='course--stats--list--item'>
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        value={this.state.materialdsNeeded}
                        onChange={e => this.change(e)}
                        id='materialdsNeeded'
                        name='materialdsNeeded'
                        placeholder='Materials Needed'
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='grid-100 pad-bottom'>
              <button className='button' type='submit'>Update Course</button>
              <NavLink to='/' className='button button-secondary'>Cancel</NavLink>
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default UpdateCourse;
