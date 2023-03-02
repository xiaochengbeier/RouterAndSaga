import React, { Component } from 'react';
import cxt  from './RouterContext';
export default class Link extends Component {
  renderLinkCxt = (cxtValue)=>{
    const {to,...extra} = this.props;
    const jump = ()=>{
      // 这里到底是是使用 push 还是 replace 可以通过属性确定
      // 目前就默认使用push
      // to 也可以是对象 但是我们就默认是 string了 
      cxtValue.history.push(to);
    }
    return (
      <a href={to}  {...extra} onClick={jump}>{this.props.children}</a>
    );
  }
  render() {
    return (
     <cxt.Consumer>
      {this.renderLinkCxt}
     </cxt.Consumer>
    )
  }
}
