import React from 'react'
import PropTypes from 'prop-types'

const Image = React.lazy(() => import('../Image'))
const Favorite = React.lazy(() => import('../Icons/Favorite'))
const GetApp = React.lazy(() => import('../Icons/GetApp'))
const Send = React.lazy(() => import('../Icons/Send'))

const Item = ({urlImage, alt}) => (
  <div className="Item">
    <h2 className="Item-title">{alt}</h2>
    <Image src={urlImage} alt={alt} />
    <div className="Item-icons">
      <Favorite className="Item-icon" isFavorite />
      <GetApp className="Item-icon" />
      <Send className="Item-icon" />
    </div>
  </div>
)

Item.displayName = 'Item'
Item.propTypes = {
  urlImage: PropTypes.string,
  alt: PropTypes.string
}

export default Item
