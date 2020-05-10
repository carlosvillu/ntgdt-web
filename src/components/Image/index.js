import React from 'react'
import PropTypes from 'prop-types'

import Play from '../Icons/Play'
import {useNearScreen} from '@s-ui/react-hooks'

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
  const [isNear, outerRef] = useNearScreen({offset: '50px'})

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
      ref={outerRef}
      className={`Image-container ${onClick ? 'link' : ''}`}
      style={{
        backgroundImage: `url(${blur})`,
        backgrounRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
      onClick={onClick}
    >
      {isNear && (
        <img
          loading="lazy"
          width={width}
          height={height}
          className={`Image ${imageKind()}`}
          style={style}
          src={src}
          alt={alt}
        />
      )}
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
