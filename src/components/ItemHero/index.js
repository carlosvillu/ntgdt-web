import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'
import {useItemFavoriteFirebase} from '../../hooks/firebase'
import Share from '../Share'
import Image from '../Image'
import Favorite from '../Icons/Favorite'
import Send from '../Icons/Send'
import Video from '../Video'

const ItemHero = ({
  item,
  videoHeight,
  heroWidth,
  maxWithForLongVerticalImages,
  nextItemId
}) => {
  const {router} = useContext(RRContext)
  const {title, site, image, video, image_blur: blur} = item
  const {isFavorite, callbackHandleClick} = useItemFavoriteFirebase(item)
  const height = (
    (item.height * maxWithForLongVerticalImages) /
    item.width
  ).toFixed()

  return (
    <Hammer
      onSwipe={e => {
        if (e.direction === 4) return router.goBack()
        if (e.direction === 2)
          return router.push({pathname: '/meme', query: {id: nextItemId}})
      }}
      onDoubleTap={callbackHandleClick}
    >
      <div className="ItemHero">
        {/* TODO: get image max-width 1024 px */}
        {image && (
          <Image
            width={maxWithForLongVerticalImages}
            height={height}
            image_blur={blur}
            src={image}
            alt={title}
            style={{width: `${maxWithForLongVerticalImages}px`}}
          />
        )}
        {video && <Video {...video} width={heroWidth} height={videoHeight} />}

        <div className="ItemHero-meta">
          <div className="ItemHero-description">
            <h3 className="ItemHero-site">{site}</h3>
            {title !== site && <h2 className="ItemHero-title">{title}</h2>}
          </div>

          <div className="ItemHero-actions">
            <Share
              item={item}
              href={`whatsapp://send?text=${encodeURIComponent(
                `https://${process.env.HOST}/preview?id=${item.id}`
              )}`}
              aria-label="Send"
              onClick={() =>
                document.dispatchEvent(
                  new window.CustomEvent('tracker:event', {
                    detail: {category: 'Action', action: 'shared'}
                  })
                )
              }
            >
              <Send className="ItemHero-icon" />
            </Share>

            <Favorite
              className={`ItemHero-icon ${isFavorite ? 'is-favorite' : ''}`}
              onClick={callbackHandleClick}
            />
          </div>
        </div>
      </div>
    </Hammer>
  )
}

ItemHero.displayName = 'ItemHero'
ItemHero.propTypes = {
  hiddenShare: PropTypes.bool,
  item: PropTypes.shape({
    createdAt: PropTypes.number,
    height: PropTypes.number,
    id: PropTypes.string,
    image: PropTypes.string,
    image_blur: PropTypes.string,
    link: PropTypes.string,
    site: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.object,
    width: PropTypes.number
  }),
  videoHeight: PropTypes.number,
  heroWidth: PropTypes.number,
  maxWithForLongVerticalImages: PropTypes.number,
  nextItemId: PropTypes.string
}

export default ItemHero
