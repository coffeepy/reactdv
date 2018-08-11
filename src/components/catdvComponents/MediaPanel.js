import React from 'react'
import CatdvComponent from './CatdvComponent'
import PropTypes from 'prop-types'

export default function MediaPanel(props) {
  const {
    autoPlay,
    autoLoad,
    selectedClipModel,
    page,
    getRef,
    // getCatdvClassInst,
  } = props

  const layoutItem = {
    'auto-load': autoLoad,
    'auto-play': autoPlay,
    'selected-clip-model': selectedClipModel,
    'type': 'media-panel',
  }

  return (
    <CatdvComponent
      page={page}
      layoutItem={layoutItem}
      getRef={(ref) => getRef && getRef(ref)}
      // getCatdvClassInst={(catdvClassInst) => getCatdvClassInst && getCatdvClassInst(catdvClassInst)}
    />
  )
}

MediaPanel.propTypes = {
  autoLoad: PropTypes.bool,
  autoPlay: PropTypes.bool,
  selectedClipModel: PropTypes.string,
  type: PropTypes.string,
  page: PropTypes.object,
  getRef: PropTypes.func,
  // getCatdvClassInst: PropTypes.func,
}
