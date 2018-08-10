import React, { Component } from 'react'

export default class CatdvComponent extends Component {
  ref = React.createRef()
  componentDidMount () {
    const {page, layoutItem} = this.props
    layoutItem.$element = $(this.ref.current)
    page.initialiseComponents(layoutItem);
  }
  render () {
    return (<div ref={this.ref}></div>)
  }
}
