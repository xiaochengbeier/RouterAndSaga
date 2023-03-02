import React, { Component } from 'react';
import cxt from './RouterContext';
import getMatch from '../react-router/match'
import propTypes from 'prop-types';

export default class Router extends Component {
  static propTypes = {
    history: propTypes.shape({
      location: propTypes.shape({
        pathname: propTypes.string,
        search: propTypes.string,
        hash: propTypes.string,
        state: propTypes.object
      }),
      action: propTypes.string,
      go: propTypes.func,
      back: propTypes.func,
      forward: propTypes.func,
      push: propTypes.func,
      replace: propTypes.func,
      listen: propTypes.func,
      block: propTypes.func,
    })
  }
  constructor(props){
    super(props);
    this.unListen = null;
    this.state = {
      location: props.history.location
    }
  }
  componentDidMount(){
    const {history} = this.props;
    this.unListen = history.listen((location)=>{
      console.log("location==>change",location);
      this.setState({
        location: location
      });
    })
  }
  componentWillUnmount(){
    this.unListen();
  }
  render() {
    const value = {};
    value.history = this.props.history;
    value.location = this.state.location;
    value.match = getMatch("/",value.location.pathname)
    return (
      <cxt.Provider value={value}>
        {this.props.children}
      </cxt.Provider>
    )
  }
}
