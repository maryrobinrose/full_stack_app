//Import React library
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class CourseDetail extends Component {
  constructor(props) {
      super(props);
      this.state = {
        course: [],
        user: []
      };
      this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    
  }
}


export default CourseDetail;
