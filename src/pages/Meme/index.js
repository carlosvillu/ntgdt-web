import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import MemeList from '../../components/MemeList'
import {useItemFirebase, useRandomFirebaseRef} from '../../hooks/firebase'
import ItemHero from '../../components/ItemHero'
import HeaderSeoItem from '../../components/HeaderSeoItem'
import {MAXWIDTH_APP} from '../../app'
import {newItems} from '../../pages/HomeMasonry'
import Image from '../../components/Image'

const Meme = ({router}) => {
  const {id} = router.location.query
  const {loading, item} = useItemFirebase(id)
  const {items: remoteItems} = useRandomFirebaseRef('/entries')

  const imgRatio = item ? item.height / item.width : null
  const heroWidth =
    window.innerWidth <= MAXWIDTH_APP ? window.innerWidth : MAXWIDTH_APP
  const videoHeight = heroWidth * imgRatio
  const maxWithForLongVerticalImages =
    imgRatio > 1.5 ? Math.min(600, heroWidth) : heroWidth

  return (
    <div className="Meme">
      {!loading && item && (
        <>
          <HeaderSeoItem item={item} />

          <ItemHero
            hiddenShare
            item={item}
            videoHeight={videoHeight}
            maxWithForLongVerticalImages={maxWithForLongVerticalImages}
          />

          <div className="HomeMasonry">
            <MemeList list={newItems(remoteItems)}>
              {({item}) => (
                <Image
                  key={item.id}
                  width={item.width}
                  height={item.height}
                  src={item.image}
                  alt={item.title}
                  kind="cover"
                  onClick={() => {
                    router.push({
                      pathname: '/meme',
                      query: {id: item.id}
                    })

                    document.dispatchEvent(
                      new window.CustomEvent('tracker:event', {
                        detail: {
                          category: 'Item',
                          action: 'fullscreen',
                          label: 'open'
                        }
                      })
                    )
                  }}
                />
              )}
            </MemeList>
          </div>
        </>
      )}
    </div>
  )
}

Meme.displayName = 'Meme'
Meme.propTypes = {
  router: PropTypes.object
}

export default Meme
