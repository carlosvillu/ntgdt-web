import React from 'react'
import PropTypes from 'prop-types'

const SvgComponent = props => {
  const {isFavorite, onClick, ...htmlProps} = props
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...htmlProps}
      fill={isFavorite ? '#ff6335' : null}
      onClick={onClick}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

SvgComponent.propTypes = {
  onClick: PropTypes.func,
  isFavorite: PropTypes.bool
}

export default SvgComponent
