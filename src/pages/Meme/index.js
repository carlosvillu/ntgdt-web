import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {useItemFirebase, useRandomFirebaseRef} from '../../hooks/firebase'
import ItemHero from '../../components/ItemHero'
import HeaderSeoItem from '../../components/HeaderSeoItem'

import Image from '../../components/Image'

const Meme = ({router}) => {
  const {id, width, height} = router.location.query
  const {loading, item} = useItemFirebase(id)
  // const {items: remoteItems} = useRandomFirebaseRef('/entries')

  const imgRatio = height / width
  const heroWidth = window.innerWidth <= 600 ? window.innerWidth : 600
  const heroHeight = heroWidth * imgRatio

  return (
    <div className="Meme">
      {!loading && item && (
        <>
          <HeaderSeoItem item={item} />

          <ItemHero hiddenShare height={heroHeight} item={item} />

          {/*
          <div className="HomeMasonry">
            <MasonryList list={remoteItems}>
              {({item, height, width}) => (
                <Image
                  src={item.image}
                  alt={item.title}
                  style={{height, width}}
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
            </MasonryList>
          </div>
            */}
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
