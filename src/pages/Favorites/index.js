import React, {useContext} from 'react'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'
import {useFavoritesFirebase} from '../../hooks/firebase'
import MemeList from '../../components/MemeList'
import Loading from '../../components/Loading'
import Image from '../../components/Image'
import {newItems} from '../../pages/HomeMasonry'

const Favorites = () => {
  const {loading, items = []} = useFavoritesFirebase()
  const {router} = useContext(RRContext)

  if (loading || items.length === 0) return <Loading />

  return (
    <div className="Favorites">
      <MemeList list={newItems(items)}>
        {({item, columnWidth}) => (
          <Image
            key={item.id}
            width={columnWidth}
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
  )
}

Favorites.displayName = 'Favorites'
export default Favorites
