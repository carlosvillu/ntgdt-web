import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {useItemFirebase, useRandomFirebaseRef} from '../../hooks/firebase'
import ItemHero from '../../components/ItemHero'
import HeaderSeoItem from '../../components/HeaderSeoItem'
import Grid from '../../components/Grid'
import VirtualListPositions from '../../context/VirtualListPositions'

const Preview = ({router}) => {
  const {id, width, height} = router.location.query
  const {loading, item} = useItemFirebase(id)
  const {items: remoteItems} = useRandomFirebaseRef('/entries')

  const {positions, setItem} = useContext(VirtualListPositions)
  const imgRatio = height / width
  const heroWidth = window.innerWidth <= 600 ? window.innerWidth : 600
  const heroHeight = heroWidth * imgRatio

  return (
    <div className="Preview">
      {!loading && item && (
        <>
          <HeaderSeoItem item={item} />

          <Grid
            scrollToIndex={positions[item.id]}
            onChangeIndex={index => setItem(item.id, index)}
            items={remoteItems}
            hero={
              <ItemHero
                hiddenShare
                height={heroHeight}
                item={item}
                onClick={() => {
                  const event = new window.CustomEvent('tracker:event', {
                    detail: {
                      category: 'ItemHero',
                      action: 'fullscreen',
                      label: 'open'
                    }
                  })
                  document.dispatchEvent(event)
                }}
              />
            }
          />
        </>
      )}
    </div>
  )
}

Preview.displayName = 'Preview'
Preview.propTypes = {
  router: PropTypes.object
}

export default Preview
