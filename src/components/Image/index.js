import React from 'react'
import PropTypes from 'prop-types'

const imgWith = url => width =>
  `https://res.cloudinary.com/carlosvillu/image/fetch/w_${width},f_auto/${url}`

const Image = ({alt, src, blur, onClick, kind}) => {
  const imgURLWith = imgWith(src)
  return (
    <img
      data-kind={kind}
      className="Image"
      onError={() => {
        const event = new window.CustomEvent('image:error', {
          detail: {src}
        })

        document.dispatchEvent(event)
      }}
      src={src}
      srcSet={`
        ${imgURLWith(320)} 320w,
        ${imgURLWith(480)} 480w,
        ${imgURLWith(600)} 600w
      `}
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

/**
<img
  className="Image"
  src={src}
  srcSet={`
${imgURLWith(320)} 320w,
${imgURLWith(480)} 480w,
${imgURLWith(768)} 768w,
${imgURLWith(1024)} 1024w,
${imgURLWith(1280)} 1280w`}
  sizes="
(max-width: 20em) 30vw,
(max-width: 30em) 100%,
(max-width: 40em) 90vw"
  alt={alt}
/>
*/
