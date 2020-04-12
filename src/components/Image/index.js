import React from 'react'
import PropTypes from 'prop-types'

const imgWith = url => width =>
  `https://res.cloudinary.com/carlosvillu/image/fetch/w_${width},f_auto/${url}`

const Image = ({alt, src, blur, onClick, kind, style = {}, width, height}) => {
  const imgURLWith = imgWith(src)

  function imageKind() {
    switch (kind) {
      case 'scaleDown':
        return 'scaleDown'
      case 'cover':
        return 'cover'
      default:
        return 'scaleDown'
    }
  }

  return (
    <img
      loading="lazy"
      width={width}
      height={height}
      onClick={onClick}
      className={`Image ${onClick ? 'link' : ''} ${imageKind()}`}
      style={style}
      src={src}
      alt={alt}
    />
  )
}

Image.displayName = 'Image'
Image.propTypes = {
  onClick: PropTypes.func,
  alt: PropTypes.string,
  blur: PropTypes.string,
  src: PropTypes.string,
  kind: PropTypes.oneOf(['photo', 'poster'])
}

export default Image
