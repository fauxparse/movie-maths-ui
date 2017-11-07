import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MovieSelector from './movie_selector'
import Poster from './poster'

export default class Movie extends Component {
  static propTypes = {
    readOnly: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    movie: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      image: PropTypes.string,
      year: PropTypes.number
    })
  }

  static defaultProps = {
    readOnly: false,
    loading: false,
    movie: undefined
  }

  constructor(props) {
    super(props)
    this.changed = this.changed.bind(this)
  }

  render() {
    const { movie, loading, readOnly } = this.props
    return (
      <div
        className={classNames('movie', {
          loading,
          empty: !movie,
          'read-only': readOnly
        })}
      >
        <MovieSelector
          movie={movie}
          readOnly={readOnly}
          onChange={this.changed}
        />
        <Poster movie={movie} loading={loading} />
      </div>
    )
  }

  changed(movie) {
    const { readOnly, onChange } = this.props
    if (onChange && !readOnly) {
      onChange(movie)
    }
  }
}
