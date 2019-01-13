import React from 'react'
import PropTypes from 'prop-types'

import {useItemFavoriteFirebase} from '../../hooks/firebase'

import Image from '../Image'
import Favorite from '../Icons/Favorite'
import GetApp from '../Icons/GetApp'
import Send from '../Icons/Send'
import Play from '../Icons/Play'

const Item = ({item, style, onClick, hiddenShare}) => {
  const {title, image, video, image_blur: blur} = item
  const {isFavorite, callbackHandleClick} = useItemFavoriteFirebase(item)

  return (
    <div className="Item" style={style}>
      <h2 className="Item-title">{title}</h2>
      <div className="Item-image" onClick={onClick}>
        {image && <Image blur={blur} src={image} alt={title} />}
        {video && <Image blur={blur} src={video.poster} alt={title} />}
        {video && <Play className="Item-play" fill="white" />}
      </div>
      <div className="Item-icons">
        <Favorite
          className="Item-icon"
          isFavorite={isFavorite}
          onClick={callbackHandleClick}
        />
        <a href={item.image} download="image.jpeg" hidden>
          <GetApp className="Item-icon" />
        </a>
        <a
          hidden={hiddenShare}
          href={`whatsapp://send?text=https://${process.env.HOST}/preview?id=${
            item.id
          }`}
          aria-label="Send"
          onClick={() =>
            document.dispatchEvent(
              new window.CustomEvent('tracker:event', {
                detail: {
                  category: 'Action',
                  action: 'shared'
                }
              })
            )
          }
        >
          <Send className="Item-icon" />
        </a>
      </div>
    </div>
  )
}

Item.displayName = 'Item'
Item.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
  hiddenShare: PropTypes.bool,
  item: PropTypes.shape({
    createdAt: PropTypes.number,
    id: PropTypes.string,
    image: PropTypes.string,
    video: PropTypes.object,
    image_blur: PropTypes.string,
    link: PropTypes.string,
    site: PropTypes.string,
    title: PropTypes.string
  })
}

export default Item
