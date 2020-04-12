import React, {useContext} from 'react'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'
import {useFirebaseRef} from '../../hooks/firebase'
import MemeList from '../../components/MemeList'
import Image from '../../components/Image'
import Loading from '../../components/Loading'

const HomeMasonry = () => {
  const {router} = useContext(RRContext)
  const {loading, items = []} = useFirebaseRef('/entries')

  if (loading || items.length === 0) return <Loading />

  return (
    <div className="HomeMasonry">
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

export function newItems(items) {
  return items.map(item => ({
    ...item,
    image: item.image || item.video?.poster || 'https://via.placeholder.com/150'
  }))
}

HomeMasonry.displayName = 'HomeMasonry'
export default HomeMasonry
