import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class Operator extends Component {
  static propTypes = {
    operator: PropTypes.oneOf(['plus', 'minus', 'equals']).isRequired,
    onClick: PropTypes.func
  }

  static defaultProps = {
    operator: 'plus'
  }

  render() {
    const { operator, onClick } = this.props
    return (
      <button className={classNames('operator', operator)} onClick={onClick}>
        <svg width={64} height={64} viewBox="0 0 64 64">
          <g style={{ transform: 'translate(32px, 32px)' }}>
            <rect x={-24} y={-6} width={48} height={12}/>
            <rect x={-24} y={-6} width={48} height={12}/>
          </g>
        </svg>
      </button>
    )
  }
}
