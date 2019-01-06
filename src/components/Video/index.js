import React from 'react'
import PropTypes from 'prop-types'

const Video = ({webm, mp4, poster, onClick}) => {
  debugger // eslint-disable-line
  return (
    <video
      autoPlay
      className="Video"
      loop
      muted
      onClick={onClick}
      playsinline
      poster={poster}
      src={mp4}
    >
      Tu navegador no soporta HTML5 video
    </video>
  )
}

Video.displayName = 'Video'
Video.propTypes = {
  onClick: PropTypes.func,
  webm: PropTypes.string,
  mp4: PropTypes.string,
  poster: PropTypes.string
}
export default Video
