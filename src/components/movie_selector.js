import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import Movies from '../lib/movies'

export default class MovieSelector extends Component {
  state = {
    value: '',
    movies: [],
    movie: undefined
  }

  render() {
    const { movie } = this.state
    return (
      <div className="movie-selector">
        <Autocomplete
          value={this.state.value}
          items={this.state.movies}
          getItemValue={item => item.title}
          onSelect={(value, item) => {
            this.setState({ value, movies: [item], movie: item })
          }}
          onChange={(event, value) => {
            this.setState({ value })
            this.update(value.trim())
          }}
          renderItem={(item, isHighlighted) => (
            <div
              style={{ background: isHighlighted ? 'lightgray' : 'white' }}
              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.id}
            >
              <cite>{item.title}</cite> <i>({item.year})</i>
            </div>
          )}
        />
        {movie && <img src={movie.image} />}
      </div>
    )
  }

  update(value) {
    clearTimeout(this.updateTimer)
    if (value) {
      this.updateTimer = setTimeout(() => this.doUpdate(value), 200)
    }
  }

  async doUpdate(title) {
    const movies = await Movies.search(title)
    this.setState({ movies })
  }
}
