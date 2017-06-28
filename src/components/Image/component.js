/* eslint no-unused-vars:0 no-return-assign:0 */

import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

const isOverflow = element =>
  element &&
  (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  )

class Image extends React.Component {
  componentDidMount () {
    this.hasOverflow = isOverflow(this._node)
    console.log(this.hasOverflow)
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
        ref={node => this._node = node}
      >
        {this.hasOverflow && <p>Has Overflow</p>}
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
