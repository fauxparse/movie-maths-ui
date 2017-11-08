import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Loader from './loader'

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1000} classNames="fade">
    {children}
  </CSSTransition>
)

const Empty = () => (
  <span className="empty">?</span>
)

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
      <TransitionGroup className={classNames('poster', { loading, empty: !image })}>
        {loading && !image && <Fade key="loader"><Loader/></Fade>}
        {image && <Fade key="image"><img src={image} alt={title} /></Fade>}
        {!image && !loading && <Fade key="empty"><Empty/></Fade>}
      </TransitionGroup>
    )
  }
}
