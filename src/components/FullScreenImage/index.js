import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Div100HV from 'react-div-100vh'
import Close from '../Icons/Close'

const FullScreenImage = ({image, isOpen, onClose}) => {
  const className = cx('FullScreenImage', {
    'is-open': isOpen
  })

  return (
    <Div100HV className={className}>
      <div
        hidden
        className="FullScreenImage-closeIconContainer"
        onClick={onClose}
      >
        <Close onClick={onClose} />
      </div>
      <img className="FullScreenImage-image" src={image} onClick={onClose} />
    </Div100HV>
  )
}

FullScreenImage.displayName = 'FullScreenImage'
FullScreenImage.propTypes = {
  image: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default FullScreenImage
