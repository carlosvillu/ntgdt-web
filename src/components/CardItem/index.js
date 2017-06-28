import React from 'react'
import PropTypes from 'prop-types'

import {Card, CardMedia, CardHeader} from 'material-ui/Card'
import Image from '../Image'
import CardItemMenu from '../CardItemMenu'

const CardItem = ({id, title, image, blur, height, site}) => {
  return (
    <div className='CardItem' style={{height}}>
      <Card className='CardItem-Card'>
        <CardItemMenu className='CardItem-Menu' image={image} />
        <CardHeader
          title={title}
          avatar={require(`../../images/${site}.png`)} />
        <CardMedia className='CardItem-CardMedia'>
          <Image className='CardItem-Image' style={{height: height - 100}} src={image} blur={blur} />
        </CardMedia>
      </Card>
    </div>
  )
}

CardItem.displayName = 'CardItem'
CardItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  blur: PropTypes.string,
  height: PropTypes.number,
  site: PropTypes.string
}

export default CardItem
