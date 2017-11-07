import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Poster extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    movie: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      image: PropTypes.string,
      year: PropTypes.number
    })
  }

  static defaultProps = {
    loading: false,
    movie: {}
  }

  render() {
    const { movie: { title, image }, loading } = this.props
    return (
      <div className={classNames('poster', { loading, empty: !image })}>
        {image && <img src={image} alt={title} />}
      </div>
    )
  }
}
