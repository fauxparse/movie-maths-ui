import React, { Component } from 'react'
import './stylesheets/App.css'
import Movie from './components/movie'
import Operator from './components/operator'
import TMDBLogo from './tmdb_logo.svg'

const sample = {
  cowboys: {
    id: 30462,
    title: "The Comancheros",
    year: 1961,
    image: "http://image.tmdb.org/t/p/w300/nJOTH28vU6Jo6VxylCWMZ3jEe75.jpg"
  },
  aliens: {
    id: 679,
    title: "Aliens",
    year: 1986,
    image: "http://image.tmdb.org/t/p/w300/nORMXEkYEbzkU5WkMWMgRDJwjSZ.jpg"
  },
  cowboys_and_aliens: {
    id: 49849,
    title: "Cowboys & Aliens",
    year: 2011,
    image: "http://image.tmdb.org/t/p/w300/tXEHvxU315Yu7bEaMMRcpDpW6RI.jpg"
  }
}

class App extends Component {
  state = {
    first: sample.cowboys,
    second: sample.aliens,
    third: sample.cowboys_and_aliens,
    operation: 'plus'
  }

  constructor(props) {
    super(props)
    this.changeOperation = this.changeOperation.bind(this)
  }

  render() {
    const { first, second, third, operation } = this.state

    return (
      <main className="app">
        <header>
          <h1>Movie Maths</h1>
        </header>
        <div className="equation">
          <Movie movie={first} onChange={movie => this.change('first', movie)} />
          <Operator operator={operation} onClick={this.changeOperation} />
          <Movie movie={second} onChange={movie => this.change('second', movie)} />
          <Operator operator="equals" />
          <Movie movie={third} readOnly loading />
        </div>
        <footer>
          <p>
            <span>Maths by <a href="https://twitter.com/simoncarryer">@simoncarryer</a>.</span>
            {' '}
            <span>UI by <a href="https://twitter.com/fauxparse">@fauxparse</a>.</span>
          </p>
          <p>
            This product uses
            the <a href="https://www.themoviedb.org/">TMDb</a> API
            but is not endorsed or certified by TMDb.
          </p>

          <a href="https://www.themoviedb.org/" className="tmdb-logo">
            <img src={TMDBLogo} alt="Powered by The Movie DB" />
          </a>
        </footer>
      </main>
    )
  }

  change(which, movie) {
    this.setState({ [which]: movie })
  }

  changeOperation() {
    const operation = this.state.operation === 'plus' ? 'minus' : 'plus'
    console.log(operation)
    this.setState({ operation })
  }
}

export default App
