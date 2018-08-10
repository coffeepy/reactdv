import ReactDom from 'react-dom'
import React from 'react'
import App from './components/App'

// css imports
import "react-table/react-table.css"
import './css/reactdv.css'

const store = {
  page: window.page,
  selectedClipModel: 'result',
  defaultModel: 'results',
}

export const PageContext = React.createContext(store)
// requires injector to load properly
ReactDom.render(
  <PageContext.Provider value={store}>
    <App page={window.page} defaultModel='results' selectedClipModel='result'/>
  </PageContext.Provider>,
  window.react_elem
)
