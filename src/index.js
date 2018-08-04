import ReactDom from 'react-dom'
import React from 'react'
import App from './components/App'

// css imports
import "react-table/react-table.css"

// ReactDom.render(<HelloReact/>, document.getElementById('root'))
// console.log('hello')
// $('document').ready(()=> console.log(document.getElementById('root')))
// $(document).ready(()=> console.log(document.getElementById('root')))

class LoadReact {
  constructor(elem, page, tag) {
    // ReactDom.render(<App page={page} defaultModel='singleCatalog'/>, elem[0])
    ReactDom.render(<App page={page} defaultModel='results'/>, elem[0])
    // ReactDom.render(<div>Test Mini</div>, elem[0])
  }
}

window.LoadReact = LoadReact

// for development only
// new LoadReact([document.getElementById('root')])
