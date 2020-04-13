import React from 'react'
import PropTypes from 'prop-types'

const Share = ({hidden, item, children}) => {
  return (
    <a
      hidden={hidden}
      href={`whatsapp://send?text=${encodeURIComponent(
        `https://${process.env.HOST}/meme?id=${item.id}`
      )}`}
      aria-label="Send"
      onClick={evt => {
        if (window.navigator.share) {
          evt.preventDefault()
          navigator.share({
            title: item.title,
            url: `https://${process.env.HOST}/meme?id=${item.id}`
          })
        }

        document.dispatchEvent(
          new window.CustomEvent('tracker:event', {
            detail: {
              category: 'Action',
              action: 'shared'
            }
          })
        )
      }}
    >
      {children}
    </a>
  )
}

Share.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool,
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
Share.displayName = 'Share'
export default Share
