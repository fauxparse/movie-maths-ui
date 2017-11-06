import React, { Component } from 'react'
import './App.css'
import MovieSelector from './components/movie_selector'

class App extends Component {
  render() {
    const { apiKey } = this.props

    return (
      <main className="app">
        <MovieSelector apiKey={apiKey} />
      </main>
    )
  }
}

export default App
