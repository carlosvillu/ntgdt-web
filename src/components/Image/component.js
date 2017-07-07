/* eslint no-unused-vars:0 no-return-assign:0 */

import React from 'react'
import PropTypes from 'prop-types'
import imagesLoaded from 'imagesloaded'

import cx from 'classnames'

const checkHasOverflow = element =>
  element &&
  (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  )

class Image extends React.Component {
  state = { hasOverflow: false }

  componentDidMount () {
    const node = this._node
    imagesLoaded(node, () => {
      this.setState({hasOverflow: checkHasOverflow(node)})
    })
    this.hasOverflow = checkHasOverflow(this._node)
  }

  render () {
    const {src, className, style, onChangeScroll, hasScroll} = this.props
    const containerClass = cx('Image', {
      'has-scrolling': hasScroll
    })

    return (
      <div
        className={containerClass}
        style={style}
        onClick={onChangeScroll}
        ref={node => { this._node = node }}
      >
        {this.state.hasOverflow && <p className='has-overflow'>haz click para activar scroll</p>}
        <img className={className} src={src} />
      </div>
    )
  }
}

Image.displayName = 'Image'
Image.propTypes = {
  src: PropTypes.string,
  hasScroll: PropTypes.bool,
  onChangeScroll: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}
export default Image
