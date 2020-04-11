import React, {useContext, useEffect, useState, isValidElement} from 'react'
import PropTypes from 'prop-types'

import Item from '../Item'
import VirtualList from 'react-tiny-virtual-list'
import RRContext from '@s-ui/react-router/lib/ReactRouterContext'
import VirtualListPositions from '../../context/VirtualListPositions'
import Loading from '../Loading'

const HEADER_HEIGTH = 70 /* px */

const Grid = ({scrollToIndex, onChangeIndex, hero, items: remoteitems}) => {
  const {router} = useContext(RRContext)
  const {setItem} = useContext(VirtualListPositions)
  const [items, setItems] = useState([hero].filter(Boolean))
  const heroWidth = window.innerWidth <= 600 ? window.innerWidth : 600
  const videoHeight = (heroWidth * 3) / 4

  useEffect(() => {
    // if is loading
    if (remoteitems && remoteitems.length > 0) {
      setItems([hero, ...remoteitems].filter(Boolean))
    }
    setItems([hero, hero, ...remoteitems].filter(Boolean))
  }, [remoteitems, hero])

  useEffect(() => {
    function imageErrorHandler(evt) {
      const {src} = evt.detail

      const indexImgBroken = items.findIndex(item => {
        if (isValidElement(item)) return false

        return item.image === src || item.video?.poster === src
      })

      setItems([
        ...items.slice(0, indexImgBroken),
        ...items.slice(indexImgBroken + 1)
      ])
    }

    document.addEventListener('image:error', imageErrorHandler)

    return () => document.removeEventListener('image:error', imageErrorHandler)
  }, [items])

  if (items.length === 0) return <Loading />

  return (
    <div className="Grid">
      <VirtualList
        width={heroWidth}
        height={window.innerHeight - HEADER_HEIGTH}
        itemCount={items.length}
        itemSize={index => {
          if (hero && index === 0) {
            return hero.props.item.video ? videoHeight : hero.props.height
          }
          return 439.39
        }}
        className="virtualList"
        scrollToIndex={scrollToIndex}
        renderItem={({index, style}) => {
          if (hero && index === 0)
            return React.cloneElement(hero, {videoHeight, heroWidth})

          if (hero && index === 1 && items.length === 2) {
            return <Loading />
          }

          return (
            <Item
              onClick={evt => {
                const {width, height} =
                  evt.currentTarget.getElementsByClassName('Image')[0] || {}

                const event = new window.CustomEvent('tracker:event', {
                  detail: {
                    category: 'Item',
                    action: 'fullscreen',
                    label: 'open'
                  }
                })

                setItem(items[index].id, 0)

                router.push({
                  pathname: '/preview',
                  query: {
                    id: items[index].id,
                    width,
                    height
                  }
                })

                document.dispatchEvent(event)
                onChangeIndex(index)
              }}
              item={items[index]}
              key={items[index].id}
              style={style}
            />
          )
        }}
      />
    </div>
  )
}

Grid.displayName = 'Grid'

Grid.propTypes = {
  scrollToIndex: PropTypes.number,
  onChangeIndex: PropTypes.func,
  hero: PropTypes.node,
  items: PropTypes.array
}

export default Grid
