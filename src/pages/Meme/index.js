import React from 'react'
import PropTypes from 'prop-types'

import MemeList from '../../components/MemeList'
import {useItemFirebase, useRandomFirebaseRef} from '../../hooks/firebase'
import {useScrollRestoration} from '../../hooks/scroll'
import ItemHero from '../../components/ItemHero'
import HeaderSeoItem from '../../components/HeaderSeoItem'
import {MAXWIDTH_APP} from '../../app'
import {newItems} from '../../pages/HomeMasonry'
import Image from '../../components/Image'
import Loading from '../../components/Loading'

const Meme = ({router}) => {
  const {id} = router.location.query
  useScrollRestoration()
  const {loading, item} = useItemFirebase(id)
  const {items: remoteItems} = useRandomFirebaseRef('/entries', id)

  const imgRatio = item ? item.height / item.width : null
  const heroWidth =
    window.innerWidth <= MAXWIDTH_APP ? window.innerWidth : MAXWIDTH_APP
  const videoHeight = heroWidth * imgRatio
  const maxWithForLongVerticalImages =
    imgRatio > 1.5 ? Math.min(600, heroWidth) : heroWidth

  if (loading) {
    return <Loading />
  }

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
              {({item, columnWidth, heightSpan}) => (
                <Image
                  {...item}
                  hasPlayButton={item.video}
                  key={item.id}
                  width={columnWidth}
                  height={heightSpan}
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
