import React, { Component } from 'react';
import cxt from  './RouterContext';
import Link from "./Link";
import getMatch from '../react-router/match';

export default class NavLink extends Component {
  renderNavLinkCxt = (cxtValue)=>{
    const {activeClassName = "active",to,...extra} = this.props;
    const match = getMatch(to , cxtValue.location.pathname);
    if(match && match.isExact == true){
      return  <Link to={to} {...extra} className={activeClassName} />
    }else{
      return <Link  to={to} {...extra} />
    }
   
  }
  render() {
    return (
      <cxt.Consumer>
        {this.renderNavLinkCxt}
      </cxt.Consumer>
    )
  }
}
