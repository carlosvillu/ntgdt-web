import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Close from '../Icons/Close'

const FullScreenImage = ({image, isOpen, onClose}) => {
  const className = cx('FullScreenImage', {
    'is-open': isOpen
  })

  return (
    <div className={className}>
      <div className="FullScreenImage-closeIconContainer" onClick={onClose}>
        <Close onClick={onClose} />
      </div>
      <img className="FullScreenImage-image" src={image} onClick={onClose} />
    </div>
  )
}

FullScreenImage.displayName = 'FullScreenImage'
FullScreenImage.propTypes = {
  image: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default FullScreenImage
