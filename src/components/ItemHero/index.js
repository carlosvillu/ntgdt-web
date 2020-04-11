import React from 'react'
import PropTypes from 'prop-types'

import {useItemFavoriteFirebase} from '../../hooks/firebase'

import Share from '../Share'
import Image from '../Image'
import Favorite from '../Icons/Favorite'
import GetApp from '../Icons/GetApp'
import Send from '../Icons/Send'
import Video from '../Video'

const ItemHero = ({
  item,
  style,
  hiddenShare,
  height,
  videoHeight,
  heroWidth
}) => {
  const {title, image, video, image_blur: blur} = item
  const {isFavorite, callbackHandleClick} = useItemFavoriteFirebase(item)

  return (
    <div
      className="ItemHero"
      style={{...style, height: `${video ? videoHeight : height}px`}}
    >
      {/* <div className="ItemHero-header"> */}
      {/*   <h3 className="ItemHero-site">{site}</h3> */}
      {/*   {title !== site && <h2 className="ItemHero-title">{title}</h2>} */}
      {/* </div> */}

      {image && <Image blur={blur} src={image} alt={title} />}
      {video && <Video {...video} width={heroWidth} height={videoHeight} />}

      {/*
      <div className="ItemHero-meta" style={{border: '1px solid red'}}>
        <Favorite
          className={`ItemHero-icon ${isFavorite ? 'is-favorite' : ''}`}
          onClick={callbackHandleClick}
        />
        <a href={item.image} download="image.jpeg" hidden>
          <GetApp className="ItemHero-icon" />
        </a>
        <Share
          item={item}
          hidden={hiddenShare}
          href={`whatsapp://send?text=${encodeURIComponent(
            `https://${process.env.HOST}/preview?id=${item.id}`
          )}`}
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
          <Send className="ItemHero-icon" />
        </Share>
      </div>
        */}
    </div>
  )
}

ItemHero.displayName = 'ItemHero'
ItemHero.propTypes = {
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
  }),
  height: PropTypes.number,
  heroWidth: PropTypes.number
}

export default ItemHero
