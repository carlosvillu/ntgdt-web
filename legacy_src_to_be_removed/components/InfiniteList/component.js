import React from 'react'
import PropTypes from 'prop-types'

import CardItem from '../CardItem'

const InfiniteList = ({virtual, itemHeight}) => (
  <div className='InfiniteList'>
    <ul style={virtual.style}>
      {
        virtual.items
          .map(({id, title, image, site, image_blur: blur}) =>
            <CardItem key={id} id={id} title={title} image={image} blur={blur} site={site} height={itemHeight} />)
      }
    </ul>
  </div>
)

InfiniteList.displayName = 'InfiniteList'
InfiniteList.propTypes = {
  virtual: PropTypes.shape({
    items: PropTypes.array,
    style: PropTypes.object
  }),
  itemHeight: PropTypes.number
}

export default InfiniteList
