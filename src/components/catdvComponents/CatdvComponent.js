import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CatdvComponent extends Component {
  ref = React.createRef()
  componentDidMount () {
    const {page, layoutItem, getRef, getCatdvClassInst} = this.props
    layoutItem.$element = $(this.ref.current)

    const catdvClassInstance = page.initialiseComponents(layoutItem);
    console.log('cci', catdvClassInstance );


    // return the reference object if requested
    getRef && getRef(this.ref)
    // return component class from catdv webapp
    // getCatdvClassInst && getCatdvClassInst(catdvClassInstance)

  }
  render () {
    return (<div ref={this.ref}></div>)
  }
}


CatdvComponent.propTypes = {
  getRef: PropTypes.func,
  getCatdvClassInst: PropTypes.func,
  layoutItem: PropTypes.object,
  // its  a class
  page: PropTypes.object,
}
