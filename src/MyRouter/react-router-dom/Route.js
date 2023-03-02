import React, { Component } from 'react';
import propTypes from 'prop-types';
import getMatch from "../react-router/match";
import ctx from './RouterContext';
export default class Route extends Component {
  constructor(props){
    super(props);
  }
  /**
   * children  render component 三者优先级关系 
   */
  static propTypes = {
    children: propTypes.any,
    render: propTypes.func,
    component: propTypes.any,
    path: propTypes.string,
    exact: propTypes.bool,
    sensitive: propTypes.bool,
    strict: propTypes.bool,
  }
  /**
   * 渲染 Route 内容
   * @param {*} ctxValue 
   * @returns 
   */
  routeRender = (ctxValue)=>{
    const {location} = ctxValue;
    const {children,path,render,component: Component} = this.props;
    // debugger;
    // 如果 children 存在那么直接渲染不管是否匹配上了
    if(typeof children == "object"){
      return children;
    }
    if(typeof children == "function"){
      return children(ctxValue);
    }
    // 如果children 不存在 那么 需要匹配
    const match = getMatch(path,location.pathname);
    if(typeof(render) == "function" && match){
      return render(ctxValue);
    }
    // debugger;
    if(typeof(Component) == 'function' && match){
      const props = {...ctxValue,match: match}
      return <Component {...props} />;
    }
    return null;
  }
  render() {
    return (
      <ctx.Consumer>
        {this.routeRender}
      </ctx.Consumer>
    )
  }
}
