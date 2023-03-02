import React, { Component } from 'react'
import cxt from './RouterContext'
export default function widthRouter(Comp){
  return class Index extends Component {
    renderWidthRouterCxt = (cxtValue)=>{
      return <Comp {...cxtValue}/>
    }
    render() {
      return (
       <cxt.Consumer>
        {this.renderWidthRouterCxt}
       </cxt.Consumer>
      )
    }
  }
}

