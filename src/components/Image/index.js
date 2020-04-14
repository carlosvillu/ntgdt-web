import React from 'react'
import PropTypes from 'prop-types'

import Play from '../Icons/Play'

const imgWith = url => width =>
  `https://res.cloudinary.com/carlosvillu/image/fetch/w_${Math.floor(
    width
  )},f_auto/${url}`

const Image = ({
  alt,
  image_blur: blur,
  hasPlayButton,
  height,
  kind,
  onClick,
  src,
  style = {},
  width
}) => {
  const imgURLWith = imgWith(src)

  function imageKind() {
    switch (kind) {
      case 'scaleDown':
        return 'scaleDown'
      case 'cover':
        return 'cover'
      default:
        return ''
    }
  }

  return (
    <div
      className={`Image-container ${onClick ? 'link' : ''}`}
      style={{
        backgroundImage: `url(${blur})`,
        backgrounRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
      onClick={onClick}
    >
      <img
        loading="lazy"
        width={width}
        height={height}
        className={`Image ${imageKind()}`}
        style={style}
        src={imgURLWith(width)}
        alt={alt}
      />
      {hasPlayButton && <Play className="Image-play" />}
    </div>
  )
}

Image.displayName = 'Image'
Image.propTypes = {
  alt: PropTypes.string,
  image_blur: PropTypes.string,
  hasPlayButton: PropTypes.bool,
  height: PropTypes.number,
  kind: PropTypes.oneOf(['photo', 'poster']),
  onClick: PropTypes.func,
  src: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.number
}

export default Image
