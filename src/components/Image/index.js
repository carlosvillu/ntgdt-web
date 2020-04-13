import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Play from '../Icons/Play'

// const imgWith = url => width =>
//   `https://res.cloudinary.com/carlosvillu/image/fetch/w_${width},f_auto/${url}`

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
  // const imgURLWith = imgWith(src)
  const [imageLoaded, setImageLoad] = useState(false)

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
    <div className="Image-container">
      <img
        loading="lazy"
        width={width}
        height={height}
        onClick={onClick}
        className={`Image ${onClick ? 'link' : ''} ${imageKind()}`}
        style={style}
        src={imageLoaded ? src : blur}
        alt={alt}
      />
      <img
        style={{width: 0, height: 0, display: 'none'}}
        src={src}
        onLoad={() => setImageLoad(true)}
      />
      {hasPlayButton && <Play className="Image-play" onClick={onClick} />}
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
