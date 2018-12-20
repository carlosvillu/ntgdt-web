import React, {useState} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Close from '../Icons/Close'

const FullScreenImage = ({image}) => {
  const [isOpen, setIsOpen] = useState(Boolean(image))
  const className = cx('FullScreenImage', {
    'is-open': isOpen
  })
  return (
    <div className={className}>
      <div
        className="FullScreenImage-closeIconContainer"
        onClick={() => {
          setIsOpen(false)
        }}
      >
        <Close
          onClick={() => {
            setIsOpen(false)
          }}
        />
      </div>
      <img
        className="FullScreenImage-image"
        src={image}
        onClick={() => {
          setIsOpen(false)
        }}
      />
    </div>
  )
}

FullScreenImage.displayName = 'FullScreenImage'
FullScreenImage.propTypes = {
  image: PropTypes.string
}

export default FullScreenImage
