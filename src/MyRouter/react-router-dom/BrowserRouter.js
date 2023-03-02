import React, { Component } from 'react';
import {crateBrowserHistory} from '../react-router/history'
import Router from './Router';
export default class BrowserRouter extends Component {
  constructor(props){
    super(props);
    this.history = crateBrowserHistory(props);
  }
  render() {
    return (
     <Router history={this.history}>
      {this.props.children}
     </Router>
    )
  }
}
