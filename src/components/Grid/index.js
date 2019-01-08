import React, {useState, useCallback} from 'react'
import PropTypes from 'prop-types'

import Item from '../Item'
import FullScreen from '../FullScreen'
import VirtualList from 'react-tiny-virtual-list'

const Grid = ({items}) => {
  const [currentItem, setCurrentItem] = useState({})
  const [isOpenImage, setIsOpenImage] = useState(false)
  const handleCloseImage = useCallback(() => {
    const event = new window.CustomEvent('tracker:event', {
      detail: {
        category: 'Item',
        action: 'fullscreen',
        label: 'close'
      }
    })
    document.dispatchEvent(event)
    setIsOpenImage(false)
  })

  return (
    <div className="Grid">
      <VirtualList
        width="100%"
        height={window.innerHeight - 124}
        itemCount={items.length}
        itemSize={439.39}
        renderItem={({index, style}) => (
          <Item
            item={items[index]}
            key={items[index].id}
            style={style}
            onClick={() => {
              const event = new window.CustomEvent('tracker:event', {
                detail: {
                  category: 'Item',
                  action: 'fullscreen',
                  label: 'open'
                }
              })
              document.dispatchEvent(event)
              setCurrentItem(items[index])
              setIsOpenImage(true)
            }}
          />
        )}
      />
      <FullScreen
        video={currentItem.video}
        image={currentItem.image}
        isOpen={isOpenImage}
        onClose={handleCloseImage}
      />
    </div>
  )
}

Grid.displayName = 'Grid'
Grid.defaultProps = {
  items: []
}

Grid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.number,
      id: PropTypes.string,
      image: PropTypes.string,
      image_blur: PropTypes.string,
      link: PropTypes.string,
      site: PropTypes.string,
      title: PropTypes.string
    })
  )
}

export default Grid
// {items.map(item => <Item item={item} key={item.id} />)}
