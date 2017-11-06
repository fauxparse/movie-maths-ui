import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <App apiKey={process.env.REACT_APP_TMDB_KEY} />,
  document.getElementById('root')
)
registerServiceWorker()
