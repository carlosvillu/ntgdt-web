import React from 'react'
import PropTypes from 'prop-types'

// 439.39
import Item from '../Item'
import VirtualList from 'react-tiny-virtual-list'
// import {AutoSizer, List} from 'react-virtualized'

const Grid = ({items}) => {
  return (
    <div className="Grid">
      <VirtualList
        width="100%"
        height={600}
        itemCount={items.length}
        itemSize={439.39}
        renderItem={({index, style}) => (
          <Item item={items[index]} key={items[index].id} style={style} />
        )}
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
