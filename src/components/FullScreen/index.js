import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Div100HV from 'react-div-100vh'
import Close from '../Icons/Close'
import Video from '../Video'

const FullScreen = ({image, video, isOpen, onClose}) => {
  const className = cx('FullScreen', {
    'is-open': isOpen
  })

  return (
    <Div100HV className={className}>
      <div hidden className="FullScreen-closeIconContainer">
        <Close />
      </div>
      {image && (
        <img className="FullScreen-image" src={image} onClick={onClose} />
      )}
      {video && <Video {...video} onClick={onClose} />}
    </Div100HV>
  )
}

FullScreen.displayName = 'FullScreen'
FullScreen.propTypes = {
  video: PropTypes.shape({
    webm: PropTypes.string,
    mp4: PropTypes.string,
    poster: PropTypes.string
  }),
  image: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

export default FullScreen
