import React from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import Favorite from '../Icons/Favorite'
import GetApp from '../Icons/GetApp'
import Send from '../Icons/Send'

const Item = ({item, style}) => {
  const {title, image, image_blur: blur} = item
  return (
    <div className="Item" style={style}>
      <h2 className="Item-title">{title}</h2>
      <div className="Item-image">
        <Image blur={blur} src={image} alt={title} />
      </div>
      <div className="Item-icons">
        <Favorite className="Item-icon" />
        <GetApp className="Item-icon" />
        <Send className="Item-icon" />
      </div>
    </div>
  )
}

Item.displayName = 'Item'
Item.propTypes = {
  style: PropTypes.object,
  item: PropTypes.shape({
    createdAt: PropTypes.number,
    id: PropTypes.string,
    image: PropTypes.string,
    image_blur: PropTypes.string,
    link: PropTypes.string,
    site: PropTypes.string,
    title: PropTypes.string
  })
}

export default Item
