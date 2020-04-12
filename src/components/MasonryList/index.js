import React, {useEffect} from 'react'
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer,
  WindowScroller
} from 'react-virtualized'
import ImageMeasurer from 'react-virtualized-image-measurer'

const maxWidthApp = 1024 // same as $maw-App css variable
const paddingApp = 8 * 2 // same as $p-App css variable

const mobile = window.matchMedia('(max-width: 600px)').matches // 2col
const tablet = window.matchMedia('(max-width: 768px)').matches // 3col
const desktop = window.matchMedia('(max-width: 1024px)').matches // 4col

const columnCount = () => {
  if (mobile) return 2
  if (tablet) return 2
  if (desktop) return 3

  return 3
}

// We need to make sure images are loaded from scratch every time for this demo
const spacer = 10
const deviceWidth = Math.min(window.innerWidth, maxWidthApp)
const columnWidth =
  (deviceWidth - paddingApp) / columnCount() -
  ((columnCount() - 1) * spacer) / columnCount()
const defaultHeight = 250
const defaultWidth = columnWidth

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight,
  defaultWidth,
  fixedWidth: true
})

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: columnCount(),
  columnWidth,
  spacer
})

const MasonryComponent = ({itemsWithSizes, children, masonryRef}) => {
  function cellRenderer({index, key, parent, style}) {
    const currentItemWithSizes = itemsWithSizes[index] || {
      item: itemsWithSizes[index]?.item ?? {},
      size: {height: defaultHeight, width: defaultWidth}
    }
    const {item, size} = currentItemWithSizes
    const height = columnWidth * (size.height / size.width) || defaultHeight

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>{children({item, height, width: columnWidth})}</div>
      </CellMeasurer>
    )
  }

  return (
    <WindowScroller overscanByPixels={0}>
      {({height, scrollTop}) => (
        <AutoSizer
          height={height}
          scrollTop={scrollTop}
          overscanByPixels={0}
          disableHeight
        >
          {({width}) => {
            return (
              <Masonry
                autoHeight
                cellCount={itemsWithSizes.length}
                cellMeasurerCache={cache}
                cellPositioner={cellPositioner}
                cellRenderer={cellRenderer}
                height={height}
                width={width}
                scrollTop={scrollTop}
                ref={masonryRef}
              />
            )
          }}
        </AutoSizer>
      )}
    </WindowScroller>
  )
}

const MasonryList = ({list, children}) => {
  const masonryRef = React.createRef()

  useEffect(() => {
    cache.clearAll()
    console.log(masonryRef)
    masonryRef.current.recomputeCellPositions()
    masonryRef.current.clearCellPositions()
    cellPositioner.reset({
      cellMeasurerCache: cache,
      columnCount: columnCount(),
      columnWidth,
      spacer
    })
  }, [masonryRef])

  const noCacheList = list.map(item => ({
    ...item,
    image: item.image + '?noCache=' + Math.random()
  }))

  return (
    <ImageMeasurer
      items={noCacheList}
      image={item => item.image}
      defaultHeight={defaultHeight}
      defaultWidth={defaultWidth}
    >
      {({itemsWithSizes}) => (
        <MasonryComponent
          itemsWithSizes={itemsWithSizes}
          children={children}
          masonryRef={masonryRef}
        />
      )}
    </ImageMeasurer>
  )
}

export default MasonryList
