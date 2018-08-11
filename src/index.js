import ReactDom from 'react-dom'
import React from 'react'
import App from './components/App'

// css imports
import "react-table/react-table.css"
import './css/reactdv.css'

// requires injector to load properly
ReactDom.render(
  <App page={window.page} defaultModel='results' selectedClipModel='result'/>,
  window.react_elem
)
