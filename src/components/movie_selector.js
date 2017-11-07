import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Autocomplete from 'react-autocomplete'
import Movies from '../lib/movies'

export default class MovieSelector extends Component {
  static propTypes = {
    readOnly: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    movie: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      image: PropTypes.string,
      year: PropTypes.number
    }),
    onChange: PropTypes.func
  }

  static defaultProps = {
    readOnly: false,
    loading: false,
    movie: undefined
  }

  state = {
    value: '',
    movies: []
  }

  render() {
    const { movie, readOnly } = this.props
    return (
      <div className="movie-selector">
        {movie || readOnly ? this.renderMovieTitle() : this.renderAutocomplete()}
      </div>
    )
  }

  renderMovieTitle() {
    const { movie, readOnly } = this.props
    const empty = !movie
    return (
      <div className={classNames('selected-movie', 'form-control', { empty })}>
        <div className="movie-title">
          <span>{empty ? '(Select two movies)' : movie.title}</span>
          {!readOnly && 
            <button onClick={e => this.clearMovie()}>
              <svg width={16} height={16}>
                <path d="M4 4 L12 12 M12 4 L 4 12" />
              </svg>
            </button>
          }
        </div>
      </div>
    )
  }

  renderAutocomplete() {
    return (
      <Autocomplete
        value={this.state.value}
        items={this.state.movies}
        getItemValue={item => item.title}
        wrapperStyle={{}}
        inputProps={{ className: 'form-control', autoFocus: true }}
        open={!!this.state.movies.length}
        onSelect={(value, item) => this.changed(item)}
        onChange={(event, value) => {
          this.setState({ value })
          this.update(value.trim())
        }}
        renderMenu={children => (
          <div className="dropdown-menu show">
            {children}
          </div>
        )}
        renderItem={(item, isHighlighted) => (
          <div
            className={classNames('dropdown-item', { active: isHighlighted })}
            key={item.id}
          >
            {item.title} {!isNaN(item.year) && <i>({item.year})</i>}
          </div>
        )}
      />
    )
  }

  update(value) {
    clearTimeout(this.updateTimer)
    if (value) {
      this.updateTimer = setTimeout(() => this.doUpdate(value), 150)
    }
  }

  async doUpdate(title) {
    const movies = await Movies.search(title)
    this.setState({ movies })
  }

  clearMovie() {
    this.changed(undefined)
  }

  changed(movie) {
    const { onChange } = this.props
    const value = movie ? movie.title : ''
    this.setState({ value, movies: [] })
    onChange && onChange(movie)
  }
}
