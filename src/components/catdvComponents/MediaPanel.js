import React from 'react'
import CatdvComponent from './CatdvComponent'

export default function MediaPanel(props) {
  const {
    autoPlay,
    autoLoad,
    selectedClipModel,
    page
  } = props

  const layoutItem = {
    'auto-load': autoLoad,
    'auto-play': autoPlay,
    'selected-clip-model': selectedClipModel,
    'type': 'media-panel',
  }

  return (<CatdvComponent page={page} layoutItem={layoutItem} />)
}
