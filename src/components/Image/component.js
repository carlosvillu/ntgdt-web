import React from 'react'
import PropTypes from 'prop-types'

const Image = ({src, className, style}) => <img className={className} style={style} src={src} />

Image.displayName = 'Image'
Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}
export default Image
