import React, {useContext, createRef} from 'react'

import RRContext from '@s-ui/react-router/lib/ReactRouterContext'
import {useFirebaseRef} from '../../hooks/firebase'
import MasonryList from '../../components/MasonryList'
import Image from '../../components/Image'
import Loading from '../../components/Loading'

const HomeMasonry = () => {
  const {router} = useContext(RRContext)
  const {loading, items = []} = useFirebaseRef('/entries')
  const masonryRef = createRef()

  if (loading || items.length === 0) return <Loading />

  console.log(masonryRef)
  if (masonryRef.current) {
    console.log(masonryRef.current)
    masonryRef.current.clearCellPositions()
    masonryRef.current.recomputeCellPositions()
  }

  const newItems = items.map(item => ({
    ...item,
    image: item.image || item.video?.poster || 'https://via.placeholder.com/150'
  }))

  return (
    <div className="HomeMasonry">
      <MasonryList list={newItems} masonryRef={masonryRef}>
        {({item, height, width}) => (
          <Image
            key={item.id}
            src={item.image}
            alt={item.title}
            style={{height, width}}
            onClick={() => {
              router.push({
                pathname: '/meme',
                query: {id: item.id, width, height}
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
  )
}

export default HomeMasonry
