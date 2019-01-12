import React, {useState, useCallback} from 'react'
import PropTypes from 'prop-types'

import {useItemFirebase} from '../../hooks/firebase'
import Item from '../../components/Item'
import FullScreen from '../../components/FullScreen'
import HeaderSeoItem from '../../components/HeaderSeoItem'

const Preview = ({router}) => {
  const {loading, item} = useItemFirebase(router.location.query.id)
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
    <div className="Preview">
      {!loading &&
        item && (
          <React.Fragment>
            <HeaderSeoItem item={item} />
            <Item
              hiddenShare
              item={item}
              onClick={() => {
                const event = new window.CustomEvent('tracker:event', {
                  detail: {
                    category: 'Item',
                    action: 'fullscreen',
                    label: 'open'
                  }
                })
                document.dispatchEvent(event)
                setCurrentItem(item)
                setIsOpenImage(true)
              }}
            />
            <FullScreen
              video={currentItem.video}
              image={currentItem.image}
              isOpen={isOpenImage}
              onClose={handleCloseImage}
            />
          </React.Fragment>
        )}
    </div>
  )
}

Preview.displayName = 'Preview'
Preview.propTypes = {
  router: PropTypes.object
}

export default Preview
