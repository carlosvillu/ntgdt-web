import React from 'react'
import PropTypes from 'prop-types'

import Helmet from 'react-helmet'

const HeaderSeoItem = ({item}) => (
  <Helmet>
    <title>{item.title.substring(0, 64)}</title>
    <meta property="og:title" content={item.title} />
    <meta
      property="og:url"
      content={`http://${process.env.HOST}/preview/${item.id}`}
    />
    {item.image && (
      <meta
        property="og:image"
        content={`https://res.cloudinary.com/carlosvillu/image/fetch/w_300,f_auto/${item.image}`}
      />
    )}
    {item.video && <meta property="og:video" content={item.video.mp4} />}
  </Helmet>
)

HeaderSeoItem.displayName = 'HeaderSeoItem'
HeaderSeoItem.propTypes = {
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

export default HeaderSeoItem
