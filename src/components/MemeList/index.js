import React from 'react'
import PropTypes from 'prop-types'

import {MAXWIDTH_APP, LATERAL_PADDING_APP} from '../../app'

const MemeList = ({list, children}) => {
  const columnCount = calculateColumnCount()
  const spacer = 18
  const deviceWidth = Math.min(window.innerWidth, MAXWIDTH_APP)
  const columnWidth =
    (deviceWidth - LATERAL_PADDING_APP) / columnCount -
    ((columnCount - 1) * spacer) / columnCount
  const autoRowsSpan = 10

  return (
    <section
      className="MemeList"
      style={{
        gridGap: `${spacer}px`,
        gridAutoRows: `${autoRowsSpan}px`,
        gridTemplateColumns: `repeat(${columnCount}, ${columnWidth}px)`
      }}
    >
      {list.map(item => {
        const height = ((item.height * columnWidth) / item.width).toFixed()
        const heightSpan = Math.floor(height / (autoRowsSpan + spacer))

        return (
          <div
            key={item.id}
            style={{
              gridRowEnd: `span ${heightSpan}`
            }}
            className="MemeList-Item"
          >
            {children({item, columnWidth})}
          </div>
        )
      })}
    </section>
  )
}

MemeList.propTypes = {
  list: PropTypes.array,
  children: PropTypes.node
}

function calculateColumnCount() {
  const mobile = window.matchMedia('(max-width: 600px)').matches // 2col
  const tablet = window.matchMedia('(max-width: 768px)').matches // 3col
  const desktop = window.matchMedia('(max-width: 1024px)').matches // 4col

  const columnCount = () => {
    if (mobile) return 2
    if (tablet) return 2
    if (desktop) return 3

    return 3
  }
  return columnCount()
}

export default MemeList
